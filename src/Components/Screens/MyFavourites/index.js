import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  withShare,
  withSendRequest,
  withApplyForAJob,
  withNamespaces,
} from 'Components/HOC'

import {
  loadFavoriteJobs,
  deleteFavoriteJob,
  loadSpecificJob,
} from 'Redux/actions/jobs'
import {
  loadFavoritesServiceProviders,
  deleteFavoriteServiceProvider,
  loadSpecificServiceProvider,
} from 'Redux/actions/serviceProviders'

import { getFavoriteJobs, getSpecificJob } from 'Redux/selectors/jobs'
import {
  getFavoritesServiceProviders,
  getSpecificServiceProvider,
} from 'Redux/selectors/serviceProviders'

import Component from './MyFavourites'

const actions = {
  // jobs
  onLoadFavoriteJobs: loadFavoriteJobs,
  onDeleteFavoriteJob: deleteFavoriteJob,
  onLoadJob: loadSpecificJob,
  // service providers
  onLoadFavoritesServiceProviders: loadFavoritesServiceProviders,
  onDeleteFavoriteServiceProvider: deleteFavoriteServiceProvider,
  onLoadServiceProvide: loadSpecificServiceProvider,
}

const selectors = createStructuredSelector({
  jobs: getFavoriteJobs,
  serviceProviders: getFavoritesServiceProviders,
  loadedJob: getSpecificJob,
  loadedServiceProvider: getSpecificServiceProvider,
})

export default compose(
  withNamespaces,
  withShare,
  withSendRequest,
  withApplyForAJob,
  connect(
    selectors,
    actions,
  ),
)(Component)
