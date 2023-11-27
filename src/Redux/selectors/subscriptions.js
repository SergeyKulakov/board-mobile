import { createSelector } from 'reselect'
import _ from 'lodash'

const getReducer = store => store.subscriptions

export const getPoints = createSelector(
  getReducer,
  data => data.points,
)

export const getPlans = createSelector(
  getReducer,
  data => data.data,
)

export const getPrice = createSelector(
  getReducer,
  data => _.get(data, 'price.price') || 0,
)

export const getActiveSubscriptionType = createSelector(
  getReducer,
  data => _.get(data, 'activePlan.subscriptionType'),
)

export const getPointsExpiryDate = createSelector(
  getReducer,
  data => data.pointsExpiryDate,
)

