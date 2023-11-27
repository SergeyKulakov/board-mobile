import { createSelector } from 'reselect'

const getData = store => store.postedJobs

export const getPostedJobs = createSelector(
  getData,
  data => data.list,
)

export const getPostedJobsFilters = createSelector(
  getData,
  data => data.filters,
)
