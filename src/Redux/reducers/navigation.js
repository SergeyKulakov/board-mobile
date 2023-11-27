import { createReducer } from 'Helpers/redux'

import { SET_NAVIGATION } from 'Redux/actions/navigation'

const initialState = {
  activeScreenName: null,
}

const handlers = {
  [SET_NAVIGATION]: (state, { componentName }) => ({
    ...state,
    activeScreenName: componentName,
  }),
}

export default createReducer(initialState, handlers)
