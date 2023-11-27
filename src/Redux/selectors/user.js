import { createSelector } from 'reselect'

const userData = store => store.user

export const getUser = createSelector(
  userData,
  data => data.user,
)
export const getUserRequestInfo = createSelector(
  userData,
  data => data.isRequest,
)
