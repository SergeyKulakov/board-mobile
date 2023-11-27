import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { getParamsWithUnits } from 'Helpers/redux/user'

export const LOAD_REQUESTS_JOBS = createAsyncAction('requests/LOAD_JOBS')
export const loadRequestsJobs = callback =>
  apiCall({
    endpoint: '/job-request/incoming',
    types: LOAD_REQUESTS_JOBS,
    method: 'GET',
    params: {
      no_geolocation_filter: true,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const LOAD_REQUESTS_SP = createAsyncAction('requests/LOAD_SP')
export const loadRequestsSP = callback =>
  apiCall({
    endpoint: '/job-request/outgoing',
    types: LOAD_REQUESTS_SP,
    method: 'GET',
    params: {
      no_geolocation_filter: true,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const ACCEPT_REQUEST = createAsyncAction('requests/ACCEPT')
export const acceptRequest = (jobRequestId, callback) =>
  apiCall({
    endpoint: `/job-request/${jobRequestId}/accept`,
    types: ACCEPT_REQUEST,
    method: 'POST',
    meta: {
      jobRequestId,
    },
    callback,
  })

export const REJECT_REQUEST = createAsyncAction('requests/REJECT')
export const rejectRequest = ({ requestId, jobId }, callback) =>
  apiCall({
    endpoint: `/job-request/${requestId}/reject`,
    types: REJECT_REQUEST,
    method: 'POST',
    meta: {
      requestId,
      jobId,
    },
    callback,
  })

export const SEND_REQUEST = createAsyncAction('requests/SEND')
export const sendRequest = ({ userId, jobId }, callback) =>
  apiCall({
    endpoint: '/job-request',
    types: SEND_REQUEST,
    method: 'POST',
    query: {
      userId,
      jobId,
    },
    callback,
  })
