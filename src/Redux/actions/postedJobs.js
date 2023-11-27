import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { getPostedJobRequestFormat } from 'Helpers/jobs'

export const LOAD_POSTED_JOBS = createAsyncAction('postedJobs/LOAD')
export const loadPostedJobs = (filters = {}, savedFilters = {}, callback) =>
  apiCall({
    endpoint: '/jobs',
    types: LOAD_POSTED_JOBS,
    method: 'GET',
    params: {
      ...filters,
      elements_per_page: 100,
      no_geolocation_filter: true,
    },
    meta: {
      filters: savedFilters,
    },
    preFormat: getPostedJobRequestFormat,
    callback,
  })

export const REMOVE_USER_JOB = createAsyncAction('postedJobs/REMOVE_USER_JOB')
export const removeUserJob = (id, callback) =>
  apiCall({
    endpoint: `/job/${id}`,
    types: REMOVE_USER_JOB,
    method: 'DELETE',
    meta: {
      jobId: id,
    },
    callback,
  })

export const UPDATE_USER_JOB = createAsyncAction('postedJobs/UPDATE_USER_JOB')
export const updateUserJob = (id, fields = {}, callback) =>
  apiCall({
    endpoint: `/job/${id}`,
    types: UPDATE_USER_JOB,
    method: 'PUT',
    query: {
      ...fields,
    },
    callback,
  })
