import { put, call, select } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { apiUrl } from 'Constants/api'
import _ from 'lodash'

import { signOut } from 'Redux/actions/auth'
import { socketAuthentificate } from 'Redux/actions/socket'
import { getRefreshTokenRequestsCount } from 'Redux/selectors/auth'

export function* onUpdateToken({ failedAction }) {
  const refreshTokenRequestsCount = yield select(getRefreshTokenRequestsCount)
  if (refreshTokenRequestsCount >= 3) {
    return yield put(signOut())
  }

  try {
    const refreshToken = yield call(() => AsyncStorage.getItem('refreshToken'))

    const { data, status } = yield call(() => {
      const api = axios.create({
        baseURL: apiUrl,
        timeout: 20000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })

      return api.get('/auth/update-creds')
    })

    if (status === 200 && _.isObject(data)) {
      const { AccessToken } = data
      if (!_.isEmpty(failedAction)) {
        yield put(failedAction)
      }
      yield put(socketAuthentificate(AccessToken))
    } else {
      yield put(signOut())
    }
  } catch (err) {
    yield put(signOut())
  }
}
