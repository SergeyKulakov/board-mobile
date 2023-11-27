import { createSelector } from 'reselect'

const getReducer = store => store.notifications

export const getNotifications = createSelector(
  getReducer,
  data => data.data,
)
