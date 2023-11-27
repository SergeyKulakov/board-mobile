import React from 'react'
import * as routes from 'Constants/routes'
import { navigation } from 'Helpers/navigation'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import statuses from 'Constants/statuses'
import { isResolveTracking } from 'Helpers/tracking'

import { getUser } from 'Redux/selectors/user'

import { withPuck, withNamespaces } from './index'

function withTracking(Component) {
  return ({ user, ...props }) => {
    const { onShowPuck, t } = props
    const handleStartTracking = job => {
      if (
        job.jobStatus === statuses.completed ||
        job.jobStatus === statuses.done
      ) {
        onShowPuck({
          type: 'error',
          message: t('apiErrors.TrackingAfterJobIsCompleted'),
        })
        return
      }

      const trackingResolve = isResolveTracking(job, user)

      if (trackingResolve) {
        navigation.push(props.componentId, routes.trackJobMap, {
          jobId: job._id,
          doerId: job.doer,
        })
      } else {
        onShowPuck({
          type: 'warning',
          message: t('jobTrack.TrackingMessageError'),
          callback: () => {
            navigation.push(props.componentId, routes.trackJobMap, {
              jobId: job._id,
              doerId: job.doer,
            })
          },
        })
      }
    }

    return <Component {...props} onStartTracking={handleStartTracking} />
  }
}

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  withPuck,
  withNamespaces,
  connect(selectors),
  withTracking,
)
