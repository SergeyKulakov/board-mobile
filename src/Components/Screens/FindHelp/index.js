import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  withSendRequest,
  withShare,
  withApplyForAJob,
  withPuck,
  withNamespaces,
} from 'Components/HOC'

import {
  loadServiceProviders,
  loadSpecificServiceProvider,
  addFavoriteServiceProvider,
  deleteFavoriteServiceProvider,
  removeServiceProvider,
} from 'Redux/actions/serviceProviders'

import {
  getServiceProvidersList,
  getSpecificServiceProvider,
  getServiceProvidersFilters,
  getServiceProvidersIsEndList,
  getServiceProvidersPage,
} from 'Redux/selectors/serviceProviders'
import { getUser } from 'Redux/selectors/user'

import Component from './FindHelp'

const actions = {
  onLoadList: loadServiceProviders,
  onLoadSpecific: loadSpecificServiceProvider,
  onAddFavorite: addFavoriteServiceProvider,
  onDeleteFavorite: deleteFavoriteServiceProvider,
  onRemoveServiceProvider: removeServiceProvider,
}

const selectors = createStructuredSelector({
  serviceProviders: getServiceProvidersList,
  specificServiceProvider: getSpecificServiceProvider,
  page: getServiceProvidersPage,
  isEndList: getServiceProvidersIsEndList,
  filters: getServiceProvidersFilters,
  user: getUser,
})

export default compose(
  withSendRequest,
  withShare,
  withApplyForAJob,
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
