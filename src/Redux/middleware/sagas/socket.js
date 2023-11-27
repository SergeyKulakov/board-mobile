import { put, select } from 'redux-saga/effects'

import { getConnectionAttempt } from 'Redux/selectors/socket'
import { socketAuthentificate } from 'Redux/actions/socket'
import { getAccessToken } from 'Redux/selectors/auth'
import { signOut } from 'Redux/actions/auth'

export function* onTrySocketAuth() {
  const attempt = yield select(getConnectionAttempt)

  if (attempt <= 5) {
    const token = yield select(getAccessToken)
    yield put(socketAuthentificate(token))
  } else {
    yield put(signOut())
  }
}
