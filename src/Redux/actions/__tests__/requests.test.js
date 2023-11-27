import { getParamsWithUnits } from 'Helpers/redux/user'
import {
  loadRequestsJobs,
  acceptRequest,
  loadRequestsSP,
  rejectRequest,
  sendRequest,
} from '../requests'

describe('actions/requests', () => {
  const callback = () => null

  it('loadRequestsJobs', () => {
    const args = [callback]
    const result = loadRequestsJobs(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/job-request/incoming',
        types: {
          REQUEST: 'requests/LOAD_JOBS.REQUEST',
          SUCCESS: 'requests/LOAD_JOBS.SUCCESS',
          FAILURE: 'requests/LOAD_JOBS.FAILURE',
        },
        method: 'GET',
        params: {
          no_geolocation_filter: true,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadRequestsSP', () => {
    const args = [callback]
    const result = loadRequestsSP(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/job-request/outgoing',
        types: {
          REQUEST: 'requests/LOAD_SP.REQUEST',
          SUCCESS: 'requests/LOAD_SP.SUCCESS',
          FAILURE: 'requests/LOAD_SP.FAILURE',
        },
        method: 'GET',
        params: {
          no_geolocation_filter: true,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('acceptRequest', () => {
    const args = ['jobRequestId', callback]
    const result = acceptRequest(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/job-request/jobRequestId/accept`,
        types: {
          REQUEST: 'requests/ACCEPT.REQUEST',
          SUCCESS: 'requests/ACCEPT.SUCCESS',
          FAILURE: 'requests/ACCEPT.FAILURE',
        },
        method: 'POST',
        meta: {
          jobRequestId: 'jobRequestId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('rejectRequest', () => {
    const args = [{ requestId: 'requestId', jobId: 'jobId' }, callback]
    const result = rejectRequest(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/job-request/requestId/reject`,
        types: {
          REQUEST: 'requests/REJECT.REQUEST',
          SUCCESS: 'requests/REJECT.SUCCESS',
          FAILURE: 'requests/REJECT.FAILURE',
        },
        method: 'POST',
        meta: {
          requestId: 'requestId',
          jobId: 'jobId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('sendRequest', () => {
    const args = [{ userId: 'userId', jobId: 'jobId' }, callback]
    const result = sendRequest(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/job-request',
        types: {
          REQUEST: 'requests/SEND.REQUEST',
          SUCCESS: 'requests/SEND.SUCCESS',
          FAILURE: 'requests/SEND.FAILURE',
        },
        method: 'POST',
        query: {
          userId: 'userId',
          jobId: 'jobId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
