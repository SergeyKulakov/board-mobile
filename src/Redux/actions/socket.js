import { createAsyncAction, createSocketAction } from 'Helpers/redux'
import { socketEvent } from 'Redux/actions/api'
import { outSocketTypes } from 'Constants/socketEventTypes'

export const MOUNT_CHANNELS = createAsyncAction('socket/MOUNT_CHANNELS')
export const mountChannels = () => ({
  type: MOUNT_CHANNELS.REQUEST,
})

export const AUTHENTICATE = createSocketAction('socket/AUTHENTICATE_REQUEST')
export const socketAuthentificate = token =>
  socketEvent({
    endpoint: outSocketTypes.authenticate,
    types: AUTHENTICATE,
    query: `Bearer ${token}`,
  })
