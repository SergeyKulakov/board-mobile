import { MOUNT_CHANNELS, socketAuthentificate } from 'Redux/actions/socket'
import { SOCKET_EVENT } from 'Constants/ids'
import { map } from 'lodash'
import io from 'socket.io-client'
import { socketPath } from 'Constants/socket'

import { inSocketTypes } from 'Constants/socketEventTypes'
import { getAccessToken } from 'Redux/selectors/auth'

export const socket = io.connect(
  socketPath,
  {
    path: '/socket',
    autoConnect: false,
  },
)

const socketMiddleware = store => next => action => {
  if (action.type === MOUNT_CHANNELS.REQUEST) {
    const token = getAccessToken(store.getState())

    socket.open()

    setTimeout(() => {
      socketAuthentificate(token)
    }, 500)

    map(inSocketTypes, type => {
      socket.on(type, payload => {
        next({ type: `socket/${type.toUpperCase()}`, payload })
      })
    })

    return next({ type: MOUNT_CHANNELS.SUCCESS })
  }

  if (action.type === SOCKET_EVENT) {
    const { endpoint, query, types, meta } = action.fields
    next({ type: types.event, payload: query, meta })

    socket.emit(endpoint, query)

    return
  }

  return next(action)
}

export default socketMiddleware
