/* eslint-disable */
export const createReducer = (initialState, handlers) => (
  state = initialState,
  action,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)
/* eslint-enable */

export const createAsyncAction = type => ({
  REQUEST: `${type}.REQUEST`,
  SUCCESS: `${type}.SUCCESS`,
  FAILURE: `${type}.FAILURE`,
})

export const createSocketAction = type => ({
  event: type,
})
