import { put } from 'redux-saga/effects'

import { loadJobsList, loadSpecificJob } from 'Redux/actions/jobs'
import { loadPostedJobs } from 'Redux/actions/postedJobs'

export function* onUpdateJob({ payload }) {
  yield put(loadJobsList({}))
  yield put(loadPostedJobs({}))
  yield put(loadSpecificJob(payload._id))
}

export function* onHireSP({ meta }) {
  yield put(loadPostedJobs({}))
  yield put(loadSpecificJob(meta.jobId))
}
