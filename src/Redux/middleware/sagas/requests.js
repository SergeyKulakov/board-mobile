import { put } from 'redux-saga/effects'

import { loadPostedJobs } from 'Redux/actions/postedJobs'
import { loadSpecificJob } from 'Redux/actions/jobs'

export function* onSendHiringRequest({ payload }) {
  yield put(loadPostedJobs())
  yield put(loadSpecificJob(payload.job))
}
