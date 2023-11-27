import { createReducer } from 'Helpers/redux'
import _ from 'lodash'

import { inSocketTypes } from 'Constants/socketEventTypes'
import {
  CONNECT_TO_CHAT,
  LOAD_CHAT_LIST,
  BLOCK_CHAT,
  UNBLOCK_CHAT,
} from 'Redux/actions/chats'

const initialState = {
  chats: {},
  activeChat: {},
}

const handlers = {
  [LOAD_CHAT_LIST.SUCCESS]: (state, { payload }) => {
    const chats = {}

    payload.list.forEach(el => {
      chats[el._id] = el
    })

    return {
      ...state,
      chats,
    }
  },
  [CONNECT_TO_CHAT.SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      activeChat: payload,
    }
  },
  [`socket/${inSocketTypes.messageReceived.toUpperCase()}`]: (
    state,
    { payload },
  ) => {
    return {
      ...state,
      chats: _.has(state, `chats.${payload.chatId}`)
        ? {
            ...state.chats,
            [payload.chatId]: {
              ...state.chats[payload.chatId],
              messages: _.get(
                state,
                'chats[payload.chatId].messages',
                [],
              ).concat([payload.message]),
            },
          }
        : state.chats,
      activeChat:
        _.get(state, 'activeChat._id') === payload.chatId
          ? {
              ...state.activeChat,
              messages: _.uniqBy(
                [..._.get(state, 'activeChat.messages', []), payload.message],
                '_id',
              ),
            }
          : state.activeChat,
    }
  },
  [BLOCK_CHAT.SUCCESS]: (state, { payload, meta }) => {
    return ({
    ...state,
    chats: {
      ...state.chats,
      [meta.chatId]: {
        ...state.chats[meta.chatId],
        status: 'inactive',
      },
    },
    activeChat: {
      ...state.activeChat,
      blockedBy: payload.sender
    }, 
  })},
  [UNBLOCK_CHAT.SUCCESS]: (state, { payload, meta }) => ({
    ...state,
    chats: {
      ...state.chats,
      [meta.chatId]: {
        ...state.chats[meta.chatId],
        status: 'active',
      },
    },
    activeChat: {
      ...state.activeChat,
      blockedBy: null
    }, 
  }),
}

export default createReducer(initialState, handlers)
