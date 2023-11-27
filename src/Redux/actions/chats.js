import { createAsyncAction, createSocketAction } from 'Helpers/redux'
import { apiCall, socketEvent } from 'Redux/actions/api'
import { secondApi } from 'Constants/api'
import { outSocketTypes } from 'Constants/socketEventTypes'
import { SOCKET_API } from 'react-native-dotenv'

export const LOAD_CHAT_LIST = createAsyncAction('chats/LOAD_LIST')
export const loadChatList = callback =>
  apiCall({
    url: secondApi,
    endpoint: '/chat-list',
    types: LOAD_CHAT_LIST,
    method: 'GET',
    callback,
  })

export const CONNECT_TO_CHAT = createAsyncAction('chats/CONNECT')
export const connectToChat = (username, callback) =>
  apiCall({
    url: secondApi,
    endpoint: '/chat/connect',
    types: CONNECT_TO_CHAT,
    method: 'POST',
    query: {
      userId: username,
    },
    callback,
  })

export const SEND_MESSAGE = createSocketAction('chats/SEND_MESSAGE')
export const sendMessage = (
  { chatId, message, type = 'regular_message' },
  userName,
  isVoiceMessage = false,
  resultVoiceMessage = null,
) => {
  return socketEvent({
    endpoint: outSocketTypes.sendMessage,
    types: SEND_MESSAGE,
    meta: {
      author: userName,
      chatId,
      message,
      type,
    },
    query: {
      chatId,
      message: {
        text: message,
        type,
      },
      isVoiceMessage: isVoiceMessage,
      resultVoiceMessage: resultVoiceMessage,
      // attach: resultVoiceMessage
    },
  })
}

export const SEND_VOICE_MESSAGE = createAsyncAction('chats/SEND_VOICE_MESSAGE')
export const sendVoiceMessage = (senderId, chatId, file, config, callback) => {
  return apiCall({
    endpoint: '/chat/voice-message',
    types: SEND_VOICE_MESSAGE,
    method: 'POST',
    url: secondApi,
    query: {
      senderId,
      chatId,
      file
    },
    callback,
  })
}

export const BLOCK_CHAT = createAsyncAction('chats/BLOCK')
export const blockChat = (chatId, callback) =>
  apiCall({
    endpoint: '/chat/block',
    types: BLOCK_CHAT,
    method: 'PUT',
    url: SOCKET_API,
    query: {
      chatId,
    },
    meta: {
      chatId,
    },
    callback,
  })

export const UNBLOCK_CHAT = createAsyncAction('chats/UNBLOCK')
export const unblockChat = (chatId, callback) =>
  apiCall({
    endpoint: '/chat/block',
    types: UNBLOCK_CHAT,
    method: 'PUT',
    url: SOCKET_API,
    query: {
      chatId,
    },
    meta: {
      chatId,
    },
    callback,
  })
