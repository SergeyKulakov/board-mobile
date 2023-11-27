import { apiCall, socketEvent } from '../api'

describe('actions/api', () => {
  it('apiCall', () => {
    expect(apiCall({ url: 'url', title: 'title' })).toStrictEqual({
      type: 'API_CALL',
      fields: { url: 'url', title: 'title' },
    })
  })

  it('socketEvent', () => {
    expect(socketEvent({ url: 'url', title: 'title' })).toStrictEqual({
      type: 'SOCKET_EVENT',
      fields: { url: 'url', title: 'title' },
    })
  })
})
