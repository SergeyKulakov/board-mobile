import { put } from 'redux-saga/effects'

import { loadReviewedSp } from 'Redux/actions/review'
import { loadSpecificJob } from 'Redux/actions/jobs'

export function* onCreateReview({ payload }) {
  yield put(loadReviewedSp(payload.reviewedUserId))
  yield put(loadSpecificJob(payload.jobId))
}
