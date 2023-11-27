import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  withJobFavourite,
  withPuck,
  withShare,
  withNamespaces,
  withRequestAnswer,
  withSendRequest,
} from 'Components/HOC'

import { loadRequestsJobs, loadRequestsSP } from 'Redux/actions/requests'
import { loadSpecificJob } from 'Redux/actions/jobs'
import { loadSpecificServiceProvider } from 'Redux/actions/serviceProviders'

import { getRequestsJobs, getRequestsSP } from 'Redux/selectors/requests'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getSpecificServiceProvider } from 'Redux/selectors/serviceProviders'

import Component from './MyRequests'

const actions = {
  onLoadRequestsJobs: loadRequestsJobs,
  onLoadRequestsSP: loadRequestsSP,
  onLoadJob: loadSpecificJob,
  onLoadProfile: loadSpecificServiceProvider,
}

const selectors = createStructuredSelector({
  jobs: getRequestsJobs,
  serviceProviders: getRequestsSP,
  loadedJob: getSpecificJob,
  loadedSP: getSpecificServiceProvider,
})

export default compose(
  withSendRequest,
  withJobFavourite,
  withPuck,
  withShare,
  withNamespaces,
  withRequestAnswer,
  connect(
    selectors,
    actions,
  ),
)(Component)
