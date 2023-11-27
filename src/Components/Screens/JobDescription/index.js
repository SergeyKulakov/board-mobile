import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  withJobFavourite,
  withApplyForAJob,
  withPuck,
  withShare,
  withNamespaces,
  withRequestAnswer,
  withCancelJob,
  withConnectToChat,
  withTracking,
} from 'Components/HOC'

import { subscribeTrack } from 'Redux/actions/track'
import { loadSpecificJob, markAsJob } from 'Redux/actions/jobs'
import { loadServices } from 'Redux/actions/services'
import { loadSpecificServiceProvider } from 'Redux/actions/serviceProviders'
import { removeUserJob } from 'Redux/actions/postedJobs'

import { getUser } from 'Redux/selectors/user'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getCategories } from 'Redux/selectors/services'
import { getSpecificServiceProvider } from 'Redux/selectors/serviceProviders'

import Component from './JobDescription'

const actions = {
  onLoadSpecificJob: loadSpecificJob,
  onLoadServices: loadServices,
  onLoadServiceProviderProfile: loadSpecificServiceProvider,
  onMarkAsJob: markAsJob,
  onRemoveJob: removeUserJob,
  onSubscribeTrack: subscribeTrack,
}

const selectors = createStructuredSelector({
  user: getUser,
  specificJob: getSpecificJob,
  services: getCategories,
  serviceProviderProfile: getSpecificServiceProvider,
})

export default compose(
  withTracking,
  withConnectToChat,
  withJobFavourite,
  withApplyForAJob,
  withPuck,
  withShare,
  withNamespaces,
  withRequestAnswer,
  withCancelJob,
  connect(
    selectors,
    actions,
  ),
)(Component)
