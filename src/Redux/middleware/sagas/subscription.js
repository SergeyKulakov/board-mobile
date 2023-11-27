import { delay } from 'redux-saga'
import { put, select, call } from 'redux-saga/effects'
import { Linking } from 'react-native'
import axios from 'axios'
import { apiUrl } from 'Constants/api'
import _ from 'lodash'
import { getAccessToken } from 'Redux/selectors/auth'

import { ADS_VIEWED } from 'Redux/actions/subscription'

export function* onBuyPoints({ callback }) {
  yield delay(500)
  const token = yield select(getAccessToken)
  try {
    const { data } = yield call(() => {
      const api = axios.create({
        baseURL: apiUrl,
        timeout: 20000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return api.post('/pts/ad-seen')
    })

    yield put({
      type: ADS_VIEWED.SUCCESS,
      payload: data,
    })
    if (_.isFunction(callback)) callback()
  } catch (err) {
    yield put({
      type: ADS_VIEWED.FAILURE,
      data: err.response,
    })
    if (_.isFunction(callback)) callback({ error: err.response })
  }
}

export function onRedirectToPaypal({ payload }) {
  const { redirectURI } = payload

  Linking.openURL(redirectURI)
}
