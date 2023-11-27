import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withToastify, withPuck } from 'Components/HOC'

import { mountChannels } from 'Redux/actions/socket'
import {
  loadPopularServiceProviders,
  loadSpecificServiceProvider,
} from 'Redux/actions/serviceProviders'
import { loadNotifications } from 'Redux/actions/notifications'
import { loadPopularServices, loadServices } from 'Redux/actions/services'
import { loadUserData } from 'Redux/actions/user'
import { loadPostedJobs } from 'Redux/actions/postedJobs'
import { loadChatList } from 'Redux/actions/chats'

import { getUser, getUserRequestInfo } from 'Redux/selectors/user'
import {
  getPopularServiceProviders,
  getSpecificServiceProvider,
} from 'Redux/selectors/serviceProviders'
import { getPopularServices, getCategories } from 'Redux/selectors/services'
import { getIsConnectedSocket } from 'Redux/selectors/socket'
import { getPoints } from 'Redux/selectors/subscriptions'

import Component from './Home'

const actions = {
  onSetupSocket: mountChannels,
  onLoadPopularServiceProviders: loadPopularServiceProviders,
  onLoadPopularCategories: loadPopularServices,
  onLoadServiceProviderProfile: loadSpecificServiceProvider,
  onLoadServices: loadServices,
  onLoadUserData: loadUserData,
  onLoadNotifications: loadNotifications,
  onLoadPostedJobs: loadPostedJobs,
  onLoadChats: loadChatList,
}

const selectors = createStructuredSelector({
  user: getUser,
  isRequest: getUserRequestInfo,
  popularServiceProviders: getPopularServiceProviders,
  popularCategories: getPopularServices,
  serviceProviderProfile: getSpecificServiceProvider,
  services: getCategories,
  isSocketConnected: getIsConnectedSocket,
  points: getPoints,
})

export default compose(
  withNamespaces,
  withToastify,
  withPuck,
  connect(
    selectors,
    actions,
  ),
)(Component)
