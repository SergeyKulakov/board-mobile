import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'

import {
  updateTrack,
  unsubscribeSpTrack,
  subscribeTrack,
} from 'Redux/actions/track'
import { loadSpecificJob } from 'Redux/actions/jobs'

import { getUser } from 'Redux/selectors/user'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getGeolocation } from 'Redux/selectors/track'

import Component from './TrackJobMap'

const actions = {
  onUpdateTrack: updateTrack,
  onUnsubscribeTracking: unsubscribeSpTrack,
  onStartTracking: subscribeTrack,
  onLoadJob: loadSpecificJob,
}

const selectors = createStructuredSelector({
  geolocation: getGeolocation,
  job: getSpecificJob,
  user: getUser,
})

export default compose(
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
