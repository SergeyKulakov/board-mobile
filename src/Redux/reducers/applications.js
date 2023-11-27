import { createReducer } from 'Helpers/redux'

import { LOAD_APPLICATION } from 'Redux/actions/applications'
import { SIGN_OUT } from 'Redux/actions/auth'

const initialState = {
  applications: [],
}

const handlers = {
  [LOAD_APPLICATION.SUCCESS]: (state, { payload }) => ({
    ...state,
    applications: payload,
  }),
  [SIGN_OUT.REQUEST]: () => initialState,
}

export default createReducer(initialState, handlers)
