import { createSelector } from 'reselect'
import _ from 'lodash'

const getReducer = store => store.review

export const getReviews = createSelector(
  getReducer,
  data => _.values(data.data),
)

export const getReviewedProfile = createSelector(
  getReducer,
  data => data.profile,
)
