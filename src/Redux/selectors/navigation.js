import { createSelector } from 'reselect'

const navigationData = store => store.navigation

export const getActiveScreenName = createSelector(
  navigationData,
  data => data.activeScreenName,
)
