import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'

export const LOAD_APPLICATION = createAsyncAction('application/LOAD')
export const loadApplications = callback =>
  apiCall({
    endpoint: '/applications',
    types: LOAD_APPLICATION,
    callback,
  })

export const APPLY_FOR_JOB = createAsyncAction('application/APPLY')
export const applyForJob = (id, callback) =>
  apiCall({
    endpoint: '/applications/apply',
    types: APPLY_FOR_JOB,
    method: 'POST',
    query: {
      jobId: id,
    },
    meta: {
      jobId: id,
    },
    callback,
  })

export const ACCEPT_APPLICATION = createAsyncAction('application/ACCEPT')
export const acceptApplication = (id, callback) =>
  apiCall({
    endpoint: `/applications/${id}/accept`,
    types: ACCEPT_APPLICATION,
    method: 'POST',
    callback,
  })

export const REJECT_APPLICATION = createAsyncAction('application/REJECT')
export const rejectApplication = (applicationId, callback) =>
  apiCall({
    endpoint: `/applications/${applicationId}/reject`,
    types: REJECT_APPLICATION,
    method: 'POST',
    meta: {
      applicationId,
    },
    callback,
  })

export const HIRE = createAsyncAction('application/HIRE')
export const hireOnApplication = (
  { jobId, userId, startDate, budget, currency },
  callback,
) =>
  apiCall({
    endpoint: '/applications/hire',
    types: HIRE,
    method: 'POST',
    query: {
      jobId,
      userId,
      startDate,
      budget,
      currency,
    },
    meta: {
      jobId,
    },
    callback,
  })
