import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { getParamsWithUnits } from 'Helpers/redux/user'

export const LOAD_BOOKED_JOBS = createAsyncAction('bookedJobs/LOAD')
export const loadBookedJobs = (filters, callback) =>
  apiCall({
    endpoint: '/jobs/booked',
    types: LOAD_BOOKED_JOBS,
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

export const CANCEL_BOOKED_JOB = createAsyncAction('bookedJobs/CANCEL')
export const cancelBookedJob = (jobId, reason, callback) =>
  apiCall({
    endpoint: `/jobs/${jobId}/cancele`,
    types: CANCEL_BOOKED_JOB,
    method: 'POST',
    meta: {
      jobId,
    },
    query: {
      reason,
    },
    callback,
  })
