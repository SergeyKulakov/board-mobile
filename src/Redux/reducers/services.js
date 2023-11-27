import { createReducer } from 'Helpers/redux'

import { LOAD_SERVICES, LOAD_POPULAR_SERVICES } from 'Redux/actions/services'

const initialState = {
  popularServices: [],
  categories: [],
  loadInfo: {
    success: false,
    loading: false,
    error: null,
  },
}

const handlers = {
  [LOAD_SERVICES.REQUEST]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: true,
      error: null,
    },
  }),
  [LOAD_SERVICES.FAILURE]: (state, { payload }) => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: payload,
    },
  }),
  [LOAD_SERVICES.SUCCESS]: (state, { payload }) => ({
    ...state,
    categories: payload,
    loadInfo: {
      success: true,
      loading: false,
      error: null,
    },
  }),
  [LOAD_POPULAR_SERVICES.REQUEST]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: true,
      error: null,
    },
  }),
  [LOAD_POPULAR_SERVICES.FAILURE]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [LOAD_POPULAR_SERVICES.SUCCESS]: (state, { payload }) => ({
    ...state,
    popularServices: payload,
    loadInfo: {
      success: true,
      loading: false,
      error: null,
    },
  }),
}

export default createReducer(initialState, handlers)
