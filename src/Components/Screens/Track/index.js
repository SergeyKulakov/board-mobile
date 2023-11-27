import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withPuck, withNamespaces, withTracking } from 'Components/HOC'

import { loadTrackJobs, subscribeTrack } from 'Redux/actions/track'
import { getTrackJobs } from 'Redux/selectors/track'
// import { getBookedJobs } from 'Redux/selectors/bookedJobs'
import { getUser } from 'Redux/selectors/user'

import Component from './Track'

const actions = {
  onLoadTrackJobs: loadTrackJobs,
  onSubscribeTrack: subscribeTrack,
}

const selectors = createStructuredSelector({
  jobs: getTrackJobs,
  // jobs: getBookedJobs,
  user: getUser,
})

export default compose(
  withTracking,
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
