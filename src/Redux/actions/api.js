import { API_CALL, SOCKET_EVENT } from 'Constants/ids'

export const apiCall = fields => ({
  type: API_CALL,
  fields,
})

export const socketEvent = fields => ({
  type: SOCKET_EVENT,
  fields,
})

export default {
  apiCall,
  socketEvent
}
