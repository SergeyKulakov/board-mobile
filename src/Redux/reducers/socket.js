import { createReducer } from 'Helpers/redux'

import { AUTHENTICATE } from 'Redux/actions/socket'
import { inSocketTypes } from 'Constants/socketEventTypes'
import { SIGN_OUT } from 'Redux/actions/auth'

const initialState = {
  isConnected: false,
  attempt: 0,
}

const handlers = {
  [`socket/${inSocketTypes.Authorized.toUpperCase()}`]: state => ({
    ...state,
    isConnected: true,
    attempt: 0,
  }),
  [`socket/${inSocketTypes.Unauthorized.toUpperCase()}`]: state => ({
    ...state,
    isConnected: false,
  }),
  [AUTHENTICATE.event]: state => ({
    ...state,
    isConnected: false,
    attempt: state.attempt + 1,
  }),
  [SIGN_OUT.REQUEST]: () => ({
    isConnected: false,
    attempt: 0,
  }),
}

export default createReducer(initialState, handlers)
