import { put } from 'redux-saga/effects'

import { loadJobsList } from 'Redux/actions/jobs'
import { loadPopularServiceProviders } from 'Redux/actions/serviceProviders'
import { signOut } from 'Redux/actions/auth'

export function* onUpdateUserAttributes() {
  yield put(loadJobsList({}))
  yield put(loadPopularServiceProviders())
}

export function* onDeleteAccount() {
  yield put(signOut())
}
