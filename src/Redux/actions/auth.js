import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from './api'

export const SET_TUTORIAL_SKIP = 'auth/SET_TUTORIAL_SKIP'
export const setSkipTutorial = () => ({
  type: SET_TUTORIAL_SKIP,
})

// remove this dependencies
export const AUTH = createAsyncAction('auth/FEDERATION_SIGN_IN')
export const auth = () => ({
  type: AUTH.REQUEST,
})
// --

export const SIGN_IN = createAsyncAction('auth/SIGN_IN')
export const signIn = ({ email, password, isRemember, callback }) =>
  apiCall({
    endpoint: '/auth/signin',
    types: SIGN_IN,
    method: 'POST',
    query: {
      username: email,
      password,
    },
    meta: {
      isRemember,
      userName: email,
    },
    callback,
  })

export const RESEND_CODE = createAsyncAction('auth/RESEND_CODE')
export const resendCode = (username, callback) => {
  return apiCall({
    method: 'post',
    endpoint: '/auth/signup/confirm-code-resend',
    query: {
      username,
    },
    types: RESEND_CODE,
    callback,
  })
}

export const FEDERATED_SIGN_IN = 'auth/FEDERATED_SIGN_IN'
export const federatedSignIn = ({ url, callback }) => ({
  type: FEDERATED_SIGN_IN,
  url,
  callback,
})

export const SIGN_UP = createAsyncAction('auth/SIGN_UP')
export const signUp = ({ userName, password, email, phoneNumber, callback }) =>
  apiCall({
    endpoint: '/auth/signup',
    types: SIGN_UP,
    method: 'POST',
    query: {
      username: userName,
      password,
      email,
      phoneNumber,
    },
    callback,
  })

export const SEND_CONFIRM_CODE = createAsyncAction('auth/SEND_CONFIRM_CODE')
export const sendConfirmCode = (code, userName, callback) =>
  apiCall({
    endpoint: '/auth/signup/confirm',
    types: SEND_CONFIRM_CODE,
    method: 'POST',
    query: {
      verificationCode: code,
      username: userName,
    },
    callback,
  })

export const FORGOT_PASS = createAsyncAction('auth/FORGOT_PASS')
export const forgotPass = ({ value: userName, callback }) =>
  apiCall({
    endpoint: '/auth/forgot-password',
    types: FORGOT_PASS,
    method: 'POST',
    query: {
      username: userName,
    },
    callback,
  })

export const CONFIRM_RESET_PASSWORD = createAsyncAction(
  'auth/CONFIRM_RESET_PASSWORD',
)
export const confirmResetPassword = (
  { userName, password, confirmationCode },
  callback,
) =>
  apiCall({
    endpoint: '/auth/forgot-password/confirm',
    types: CONFIRM_RESET_PASSWORD,
    method: 'POST',
    query: {
      username: userName,
      password,
      confirmationCode,
    },
    callback,
  })

export const SIGN_OUT_APP = createAsyncAction('auth/SIGN_OUT_APP')
export const signOutApp = () =>
  apiCall({
    endpoint: '/auth/logout',
    types: SIGN_OUT_APP,
  })

export const SIGN_OUT = createAsyncAction('auth/SIGN_OUT')
export const signOut = () => ({
  type: SIGN_OUT.REQUEST,
})

export const REFRESH_TOKENS = createAsyncAction('auth/REFRESH_TOKENS')
export const refreshTokens = (refreshToken, callback) =>
  apiCall({
    endpoint: '/auth/update-creds',
    types: REFRESH_TOKENS,
    auth: refreshToken,
    callback,
  })

export const UPDATE_TOKEN = 'auth/UPDATE'
export const updateToken = failedAction => ({
  type: UPDATE_TOKEN,
  failedAction,
})

export const SET_AUTORIZATE = 'auth/SET_AUTORIZATE'
export const REFRESH_TOKEN = 'auth/REFRESH_TOKEN'
