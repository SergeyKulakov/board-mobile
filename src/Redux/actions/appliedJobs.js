import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { getParamsWithUnits } from 'Helpers/redux/user'

export const LOAD_APPLIED_JOBS = createAsyncAction('appliedJobs/LOAD')
export const loadAppliedJobs = (filters, callback) =>
  apiCall({
    endpoint: '/applications',
    types: LOAD_APPLIED_JOBS,
    method: 'GET',
    params: {
      ...filters,
      elements_per_page: 1000,
      no_geolocation_filter: true,
    },
    meta: {
      filters,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const CANCEL_APPLIED_JOB = createAsyncAction('appliedJobs/CANCEL')
export const cancelAppliedJob = (jobId, reason, callback) =>
  apiCall({
    endpoint: `/jobs/${jobId}/cancele`,
    types: CANCEL_APPLIED_JOB,
    method: 'POST',
    meta: {
      jobId,
    },
    query: {
      reason,
    },
    callback,
  })
