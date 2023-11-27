import React from 'react'
import PropTypes from 'prop-types'
import { omit, isFunction } from 'lodash'
import * as routes from 'Constants/routes'
import { navigation } from 'Helpers/navigation'
import { booked } from 'Constants/statuses'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { cancelBookedJob } from 'Redux/actions/bookedJobs'
import { cancelAppliedJob } from 'Redux/actions/appliedJobs'

import { withPuck, withNamespaces } from './index'

function withCancelJob(Component) {
  return class extends React.Component {
    static propTypes = {
      onCancelAppliedJob: PropTypes.func,
      onCancelBookedJob: PropTypes.func,
    }

    handleCancelJob = (job, callback) => {
      const {
        onCancelAppliedJob,
        onCancelBookedJob,
        getError,
        onShowPuck,
      } = this.props

      const func =
        job.jobStatus === booked ? onCancelBookedJob : onCancelAppliedJob

      navigation.showModal(routes.canceledModal, {
        onSubmit: reason => {
          if (isFunction(callback)) callback()
          func(job._id, reason, ({ error }) => {
            if (error) onShowPuck({ type: 'error', message: getError(error) })
          })
        },
      })
    }

    render() {
      return (
        <Component
          {...omit(this.props, ['onCancelAppliedJob', 'onCancelBookedJob'])}
          onCancelJob={this.handleCancelJob}
        />
      )
    }
  }
}

const actions = {
  onCancelAppliedJob: cancelAppliedJob,
  onCancelBookedJob: cancelBookedJob,
}

export default compose(
  withNamespaces,
  withPuck,
  connect(
    null,
    actions,
  ),
  withCancelJob,
)
