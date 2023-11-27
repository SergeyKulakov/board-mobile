import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'

export const CREATE_REVIEW = createAsyncAction('review/CREATE')
export const createSPReview = (
  { jobId, reviewedUserId, rate, comment },
  callback,
) =>
  apiCall({
    endpoint: '/review',
    types: CREATE_REVIEW,
    method: 'POST',
    query: { jobId, reviewedUserId, rate, comment },
    callback,
  })

export const LOAD_REVIEWED_SP = createAsyncAction('review/LOAD_SP')
export const loadReviewedSp = (userId, callback) =>
  apiCall({
    endpoint: `/service-provider/${userId}`,
    types: LOAD_REVIEWED_SP,
    method: 'GET',
    callback,
  })

export const LOAD_USER_REVIEWS = createAsyncAction('review/LOAD_USER_REVIEWS')
export const loadUserReviews = (userId, callback) =>
  apiCall({
    endpoint: `/review/user/${userId}`,
    types: LOAD_USER_REVIEWS,
    method: 'GET',
    callback,
  })

export const UPDATE_REVIEW = createAsyncAction('review/UPDATE')
export const updateReview = ({ reviewId, comment, rate, jobId }, callback) =>
  apiCall({
    endpoint: `/review/${reviewId}`,
    types: UPDATE_REVIEW,
    method: 'PUT',
    meta: {
      reviewId,
      comment,
      rate,
      jobId,
    },
    query: {
      comment,
      rate,
    },
    callback,
  })

export const DELETE_REVIEW = createAsyncAction('review/DELETE')
export const deleteReview = (reviewId, callback) =>
  apiCall({
    endpoint: `/review/${reviewId}`,
    types: DELETE_REVIEW,
    method: 'DELETE',
    meta: {
      reviewId,
    },
    callback,
  })
