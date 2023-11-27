import { createSelector } from 'reselect'

const getData = store => store.requests

export const getRequestsJobs = createSelector(
  getData,
  data => data.jobs,
)
export const getRequestsSP = createSelector(
  getData,
  data => data.serviceProviders,
)
