import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  withShare,
  withSendRequest,
  withNamespaces,
  withPuck,
  withHireSP,
  withConnectToChat,
} from 'Components/HOC'

import {
  addFavoriteServiceProvider,
  deleteFavoriteServiceProvider,
  loadSpecificServiceProvider,
} from 'Redux/actions/serviceProviders'

import { getSpecificServiceProvider } from 'Redux/selectors/serviceProviders'
import { getUser } from 'Redux/selectors/user'
import { getSpecificJob } from 'Redux/selectors/jobs'

import Component from './ServiceProviderProfile'

const actions = {
  onAddFavorite: addFavoriteServiceProvider,
  onDeleteFavourite: deleteFavoriteServiceProvider,
  onLoadProfile: loadSpecificServiceProvider,
}

const selectors = createStructuredSelector({
  profile: getSpecificServiceProvider,
  user: getUser,
  job: getSpecificJob,
})

export default compose(
  withShare,
  withNamespaces,
  withPuck,
  withSendRequest,
  withHireSP,
  withConnectToChat,
  connect(
    selectors,
    actions,
  ),
)(Component)
