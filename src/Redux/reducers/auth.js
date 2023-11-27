import { createReducer } from 'Helpers/redux'

import {
  SET_TUTORIAL_SKIP,
  AUTH,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  SEND_CONFIRM_CODE,
  SET_AUTORIZATE,
  CONFIRM_RESET_PASSWORD,
  FORGOT_PASS,
  REFRESH_TOKENS,
  UPDATE_TOKEN,
} from 'Redux/actions/auth'

const initialState = {
  isTutorialShow: true,
  accessToken: null,
  idToken: null,
  isAuth: false,
  loadInfo: {
    success: false,
    loading: false,
    error: null,
  },
  refreshTokenRequestsCount: 0,
}

const handlers = {
  [SET_TUTORIAL_SKIP]: state => ({
    ...state,
    isTutorialShow: false,
  }),
  [AUTH.REQUEST]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: true,
      error: null,
    },
  }),
  [AUTH.FAILURE]: (state, { payload: { data } }) => ({
    ...state,
    accessToken: null,
    idToken: null,
    isAuth: false,
    loadInfo: {
      success: false,
      loading: false,
      error: data || true,
    },
  }),
  [AUTH.SUCCESS]: (state, { payload: { data } }) => ({
    ...state,
    accessToken: data.accessToken,
    idToken: data.idToken,
    isAuth: true,
    loadInfo: {
      success: true,
      loading: false,
      error: null,
    },
  }),
  [SIGN_OUT.REQUEST]: state => ({
    ...state,
    accessToken: null,
    idToken: null,
    isAuth: false,
  }),
  [SIGN_IN.REQUEST]: state => ({
    ...state,
    loadInfo: {
      ...state.loadInfo,
      loading: true,
    },
  }),
  [SIGN_IN.FAILURE]: state => ({
    ...state,
    isAuth: false,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [SET_AUTORIZATE]: (state, { credentials }) => ({
    ...state,
    isAuth: true,
    accessToken: credentials.AccessToken,
    idToken: credentials.IdToken,
  }),
  [SIGN_IN.SUCCESS]: (state, { payload: { tokens } }) => ({
    ...state,
    accessToken: tokens.AccessToken,
    idToken: tokens.IdToken,
    isAuth: true,
    loadInfo: {
      success: true,
      loading: false,
      error: false,
    },
  }),
  [REFRESH_TOKENS.REQUEST]: state => ({
    ...state,
    loadInfo: {
      ...state.loadInfo,
      loading: true,
    },
  }),
  [REFRESH_TOKENS.FAILURE]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [REFRESH_TOKENS.SUCCESS]: (state, { payload }) => ({
    ...state,
    accessToken: payload.AccessToken,
    idToken: payload.IdToken,
    isAuth: true,
    loadInfo: {
      success: true,
      loading: false,
      error: false,
    },
    refreshTokenRequestsCount: 0,
  }),
  [UPDATE_TOKEN]: state => ({
    ...state,
    refreshTokenRequestsCount: state.refreshTokenRequestsCount + 1,
  }),
  [SIGN_UP.REQUEST]: state => ({
    ...state,
    loadInfo: {
      ...state.loadInfo,
      loading: true,
    },
  }),
  [SIGN_UP.FAILURE]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [SIGN_UP.SUCCESS]: state => ({
    ...state,
    loadInfo: {
      success: true,
      loading: false,
      error: false,
    },
  }),
  [SEND_CONFIRM_CODE.REQUEST]: state => ({
    ...state,
    loadInfo: {
      ...state.loadInfo,
      loading: true,
    },
  }),
  [SEND_CONFIRM_CODE.FAILURE]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [SEND_CONFIRM_CODE.SUCCESS]: state => ({
    ...state,
    loadInfo: {
      success: true,
      loading: false,
      error: false,
    },
  }),
  [FORGOT_PASS.REQUEST]: state => ({
    ...state,
    loadInfo: {
      ...state.loadInfo,
      loading: true,
    },
  }),
  [FORGOT_PASS.FAILURE]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [FORGOT_PASS.SUCCESS]: state => ({
    ...state,
    loadInfo: {
      success: true,
      loading: false,
      error: false,
    },
  }),
  [CONFIRM_RESET_PASSWORD.REQUEST]: state => ({
    ...state,
    loadInfo: {
      ...state.loadInfo,
      loading: true,
    },
  }),
  [CONFIRM_RESET_PASSWORD.FAILURE]: state => ({
    ...state,
    loadInfo: {
      success: false,
      loading: false,
      error: true,
    },
  }),
  [CONFIRM_RESET_PASSWORD.SUCCESS]: state => ({
    ...state,
    loadInfo: {
      success: true,
      loading: false,
      error: false,
    },
  }),
}

export default createReducer(initialState, handlers)
