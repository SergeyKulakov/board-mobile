import { createSelector } from 'reselect'

const getData = store => store.bookedJobs

export const getBookedJobs = createSelector(
  getData,
  data => data.list,
)

export const getBookedJobsFilters = createSelector(
  getData,
  data => data.filters,
)
