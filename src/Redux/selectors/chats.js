import { createSelector } from 'reselect'
import _ from 'lodash'

const getReducer = store => store.chats

export const getChats = createSelector(
  getReducer,
  data => _.values(data.chats),
)

export const getActiveChat = createSelector(
  getReducer,
  data => data.activeChat,
)
