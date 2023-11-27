import { outSocketTypes } from 'Constants/socketEventTypes'

import { mountChannels, socketAuthentificate } from '../socket'

describe('actions/socket', () => {
  it('mountChannels', () => {
    const result = mountChannels()

    expect(result).toStrictEqual({
      type: 'socket/MOUNT_CHANNELS.REQUEST',
    })
  })

  it('socketAuthentificate', () => {
    const result = socketAuthentificate('token')

    expect(result).toStrictEqual({
      fields: {
        endpoint: outSocketTypes.authenticate,
        types: {
          event: 'socket/AUTHENTICATE_REQUEST',
        },
        query: `Bearer token`,
      },
      type: 'SOCKET_EVENT',
    })
  })
})
