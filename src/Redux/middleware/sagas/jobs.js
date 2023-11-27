import { put, select } from 'redux-saga/effects'

import { loadJobsList, loadSpecificJob } from 'Redux/actions/jobs'

import { getJobsFilters } from 'Redux/selectors/jobs'

export function* onCaceledAppliedJob() {
  const filters = yield select(getJobsFilters)
  yield put(loadJobsList({ filters }))
}

export function* onUpdateSpecificJob({ meta }) {
  yield put(loadSpecificJob(meta.jobId))
}
