import { put, select } from 'redux-saga/effects'
import qs from 'qs'
import * as routes from 'Constants/routes'

import { socket } from 'Redux/middleware/socket'
import AsyncStorage from '@react-native-community/async-storage'
import { setupRoot } from 'Navigation'
import { loadUserData } from 'Redux/actions/user'
import { SET_AUTORIZATE, signOut, updateToken } from 'Redux/actions/auth'
import { getActiveScreenName } from 'Redux/selectors/navigation'

export function* onSignOut() {
  yield AsyncStorage.removeItem('refreshToken')

  const screenId = yield select(getActiveScreenName)
  if (
    screenId === routes.onBoarding ||
    screenId === routes.login ||
    screenId === routes.singUp
  )
    return

  try {
    socket.close()
    setupRoot(false, routes.login)

    yield AsyncStorage.removeItem('refreshToken')
  } catch (err) {
    if (__DEV__) console.log(err)
  }
}

export function* onSignIn({
  payload: {
    tokens: { RefreshToken },
  },
  meta,
}) {
  if (meta.isRemember) {
    yield AsyncStorage.setItem('refreshToken', RefreshToken)
  } else {
    yield AsyncStorage.setItem('clearUserSession', 'true')
  }
}

export function* onAuthGetUser() {
  yield put(loadUserData())
}

export function* onSignInFailure() {
  yield put(signOut())
  AsyncStorage.removeItem('refreshToken')
}

export function* onFederatedSignIn({ url, callback }) {
  const queryString = url.substr(url.indexOf('?') + 1)

  const query = qs.parse(queryString)
  if (query.user) {
    let data
    if (query.user.endsWith('#_=_')) {
      data = JSON.parse(query.user.slice(0, -4))
    } else if (query.user.endsWith('#')) {
      data = JSON.parse(query.user.slice(0, -1))
    } else {
      data = JSON.parse(query.user)
    }

    yield AsyncStorage.setItem('refreshToken', data.tokens.RefreshToken)
    yield put({ type: SET_AUTORIZATE, credentials: data.tokens })
    yield put(loadUserData())
    callback({})
  } else if (query.error_message) {
    let error

    if (query.error_message.endsWith('#_=_')) {
      error = JSON.parse(query.error_message.slice(0, -4))
    } else if (query.error_message.endsWith('#')) {
      error = JSON.parse(query.error_message.slice(0, -1))
    } else error = JSON.parse(query.error_message)
    if (error.message) {
      callback({ error: { payload: { ...error } } })
    }
  }
}

export function* onUnauthorizedError(action) {
  yield put(updateToken(action.failedAction))
}
