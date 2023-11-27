import { put, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'

import { refreshTokens, signOut } from 'Redux/actions/auth'

export function* onRefreshToken() {
  try {
    const refreshToken = yield call(() => AsyncStorage.getItem('refreshToken'))

    yield put(refreshTokens(refreshToken))
  } catch (err) {
    yield put(signOut())
  }
}
