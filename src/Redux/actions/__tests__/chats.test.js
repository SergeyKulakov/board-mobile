import { secondApi } from 'Constants/api'
import { loadChatList, connectToChat, sendMessage } from '../chats'

describe('actions/chats', () => {
  const callback = () => null

  it('loadChatList', () => {
    const args = [callback]
    const result = loadChatList(...args)

    expect(result).toStrictEqual({
      fields: {
        url: secondApi,
        endpoint: '/chat-list',
        types: {
          REQUEST: 'chats/LOAD_LIST.REQUEST',
          SUCCESS: 'chats/LOAD_LIST.SUCCESS',
          FAILURE: 'chats/LOAD_LIST.FAILURE',
        },
        method: 'GET',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('connectToChat', () => {
    const args = ['userId', callback]
    const result = connectToChat(...args)

    expect(result).toStrictEqual({
      fields: {
        url: secondApi,
        endpoint: '/chat/connect',
        types: {
          REQUEST: 'chats/CONNECT.REQUEST',
          SUCCESS: 'chats/CONNECT.SUCCESS',
          FAILURE: 'chats/CONNECT.FAILURE',
        },
        method: 'POST',
        query: {
          userId: 'userId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('sendMessage', () => {
    const args = [
      { chatId: 'chatId', message: 'message', type: 'regular_message' },
      'userName',
    ]
    const result = sendMessage(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: 'sendMessage',
        types: {
          event: 'chats/SEND_MESSAGE',
        },
        meta: {
          author: 'userName',
          chatId: 'chatId',
          message: 'message',
          type: 'regular_message',
        },
        query: {
          chatId: 'chatId',
          message: {
            text: 'message',
            type: 'regular_message',
          },
        },
      },
      type: 'SOCKET_EVENT',
    })
  })
})
