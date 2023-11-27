import { createSelector } from 'reselect'

const getData = store => store.appliedJobs

export const getAppliedJobs = createSelector(
  getData,
  data => data.list,
)

export const getAppliedJobsFilters = createSelector(
  getData,
  data => data.filters,
)
