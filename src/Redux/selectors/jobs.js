import { createSelector } from 'reselect'

const jobsData = store => store.jobs

export const getJobsList = createSelector(
  jobsData,
  data => data.jobs,
)
export const getSpecificJob = createSelector(
  jobsData,
  data => data.vacancy,
)
export const getFavoriteJobs = createSelector(
  jobsData,
  data => data.favorites,
)
export const getIsEndJobsList = createSelector(
  jobsData,
  data => data.isEndJobsList,
)
export const getJobsPage = createSelector(
  jobsData,
  data => data.page,
)
export const getJobsFilters = createSelector(
  jobsData,
  data => data.filters,
)
