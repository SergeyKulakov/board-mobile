import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { getParamsWithUnits } from 'Helpers/redux/user'
import { checkInvalidJob } from 'Helpers/jobs'

import { JOBS_ELEMENTS_PER_PAGE } from 'Constants/pagination'

export const LOAD_JOBS_LIST = createAsyncAction('jobs/LOAD_LIST')
export const loadJobsList = ({
  filters = {},
  callback = () => {},
  isPagination = false,
  isClearRemoved = false,
  savedFilters = {},
}) =>
  apiCall({
    endpoint: '/jobs',
    types: LOAD_JOBS_LIST,
    method: 'GET',
    params: {
      ...filters,
      elements_per_page: JOBS_ELEMENTS_PER_PAGE,
    },
    meta: {
      isPagination,
      filters: savedFilters,
      isClearRemoved,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const LOAD_SPECIFIC = createAsyncAction('jobs/LOAD_SPECIFIC_VACANCY')
export const loadSpecificJob = (id, callback) =>
  apiCall({
    endpoint: `/job/${id}`,
    types: LOAD_SPECIFIC,
    preFormat: getParamsWithUnits,
    postFormat: checkInvalidJob,
    callback,
  })

// favorite jobs
export const LOAD_FAVORITE = createAsyncAction('jobs/LOAD_FAVORITE')
export const loadFavoriteJobs = callback =>
  apiCall({
    endpoint: '/favourites/job/list',
    types: LOAD_FAVORITE,
    params: {
      elements_per_page: 1000,
      no_geolocation_filter: true,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const ADD_FAVORITE = createAsyncAction('jobs/ADD_FAVORITE')
export const addFavoriteJob = (jobId, callback) =>
  apiCall({
    endpoint: '/favourites/job',
    types: ADD_FAVORITE,
    method: 'POST',
    query: {
      jobId,
    },
    meta: {
      id: jobId,
    },
    callback,
  })

export const DELETE_FAVORITE = createAsyncAction('jobs/DELETE_FAVORITE')
export const deleteFavoriteJob = (id, callback) =>
  apiCall({
    endpoint: '/favourites/job',
    types: DELETE_FAVORITE,
    method: 'DELETE',
    query: {
      favouriteJobId: id,
    },
    meta: {
      id,
    },
    callback,
  })

// user vacancies
export const POST_USER_VACANCY = createAsyncAction('jobs/POST_USER_VACANCY')
export const postUserVacancy = (fields, callback) =>
  apiCall({
    endpoint: '/job',
    types: POST_USER_VACANCY,
    method: 'POST',
    query: {
      ...fields,
    },
    callback,
  })

export const REMOVE_JOB = 'jobs/REMOVE'
export const removeJob = id => ({
  type: REMOVE_JOB,
  id,
})

export const MARK_AS = createAsyncAction('jobs/MARK_AS')
export const markAsJob = (jobId, callback) =>
  apiCall({
    endpoint: `/jobs/${jobId}/complete`,
    types: MARK_AS,
    method: 'POST',
    callback,
  })

export const INVALID_JOB = 'jobs/INVALID_JOB'
export const invalidJob = jobId => ({
  type: INVALID_JOB,
  payload: { jobId },
})
