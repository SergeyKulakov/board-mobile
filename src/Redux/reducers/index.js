import { combineReducers } from 'redux'

import auth from './auth'
import user from './user'
import services from './services'
import navigation from './navigation'
import jobs from './jobs'
import serviceProviders from './serviceProviders'
import applications from './applications'
import postedJobs from './postedJobs'
import appliedJobs from './appliedJobs'
import bookedJobs from './bookedJobs'
import requests from './requests'
import review from './review'
import track from './track'
import settings from './settings'
import socket from './socket'
import chats from './chats'
import notifications from './notifications'
import subscriptions from './subscriptions'

const appReducer = combineReducers({
  auth,
  user,
  services,
  navigation,
  jobs,
  serviceProviders,
  applications,
  postedJobs,
  appliedJobs,
  bookedJobs,
  requests,
  review,
  track,
  settings,
  socket,
  chats,
  notifications,
  subscriptions,
})

const rootReducer = (state, action) => {
  // TODO: if action.type === LOGOUT
  // if (action.type === AUTH_CHANGE_SUBSCRIBE && !action.payload.data) {
  //   return appReducer(undefined, action)
  // }

  return appReducer(state, action)
}

export default rootReducer
