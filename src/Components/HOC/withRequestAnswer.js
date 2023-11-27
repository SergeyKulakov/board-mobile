import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { acceptRequest, rejectRequest } from 'Redux/actions/requests'

import { withPuck, withNamespaces } from './index'

function withRequestAnswer(Component) {
  return class extends React.Component {
    static propTypes = {
      accept: PropTypes.func,
      reject: PropTypes.func,
    }

    state = {
      loadRequestId: null,
    }

    showError = (error, callback) => {
      const { onShowPuck, getError } = this.props

      onShowPuck({
        type: 'error',
        message: getError(error),
        callback: _.isFunction(callback) ? () => callback(error) : undefined,
      })
    }

    handleAcceptRequest = (request, callback) => {
      const { accept, onShowPuck } = this.props

      this.setState({ loadRequestId: request._id })
      accept(request._id, ({ error }) => {
        this.setState({ loadRequestId: null }, () => {
          if (error) this.showError(error, callback)
          else onShowPuck({ callback })
        })
      })
    }

    handleRejectRequest = (request, callback) => {
      const { reject, onShowPuck } = this.props

      this.setState({ loadRequestId: request._id })
      reject({ requestId: request._id, jobId: request.job }, ({ error }) => {
        this.setState({ loadRequestId: null }, () => {
          if (error) this.showError(error)
          else onShowPuck({ callback })
        })
      })
    }

    render() {
      const { loadRequestId } = this.state

      return (
        <Component
          {..._.omit(this.props, ['accept', 'reject'])}
          onAcceptRequest={this.handleAcceptRequest}
          onRejectRequest={this.handleRejectRequest}
          loadRequestId={loadRequestId}
        />
      )
    }
  }
}

const actions = {
  accept: acceptRequest,
  reject: rejectRequest,
}

export default compose(
  withNamespaces,
  withPuck,
  connect(
    null,
    actions,
  ),
  withRequestAnswer,
)
