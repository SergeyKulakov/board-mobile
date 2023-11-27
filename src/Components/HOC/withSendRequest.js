import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { navigation } from 'Helpers/navigation'
import * as routes from 'Constants/routes'

import { sendRequest } from 'Redux/actions/requests'
import { getSpecificServiceProvider } from 'Redux/selectors/serviceProviders'

function withSendRequest(Component) {
  return class extends React.Component {
    static propTypes = {
      _specificJob: PropTypes.object,
      _onSendRequest: PropTypes.func,
    }

    handleShowJobs = ({ profile }) => {
      const { _specificJob, _onSendRequest } = this.props

      let data = {}

      if (_.isObject(profile)) data = profile
      else data = _specificJob

      navigation.showModal(routes.selectJob, {
        username: data.username,
        onSubmit: (job, callback) => {
          const request = {
            userId: data.username,
            jobId: job._id,
          }

          _onSendRequest(request, ({ error }) => {
            if (_.isFunction(callback)) callback(error)
          })
        },
      })
    }

    render() {
      return (
        <>
          <Component
            {..._.omit(this.props, ['_specificJob', '_onSendRequest'])}
            onSendRequest={this.handleShowJobs}
          />
        </>
      )
    }
  }
}

const selectors = createStructuredSelector({
  _specificJob: getSpecificServiceProvider,
})

const actions = {
  _onSendRequest: sendRequest,
}

const withSendRequestHOC = compose(
  connect(
    selectors,
    actions,
  ),
  withSendRequest,
)

export default withSendRequestHOC
