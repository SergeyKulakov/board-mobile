import {
  loadApplications,
  acceptApplication,
  applyForJob,
  hireOnApplication,
  rejectApplication,
} from '../applications'

describe('actions/applications', () => {
  const callback = () => null

  it('loadApplications', () => {
    const args = [callback]
    const result = loadApplications(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/applications',
        types: {
          REQUEST: 'application/LOAD.REQUEST',
          SUCCESS: 'application/LOAD.SUCCESS',
          FAILURE: 'application/LOAD.FAILURE',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('acceptApplication', () => {
    const args = ['applicationID', callback]
    const result = acceptApplication(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/applications/applicationID/accept`,
        types: {
          REQUEST: 'application/ACCEPT.REQUEST',
          SUCCESS: 'application/ACCEPT.SUCCESS',
          FAILURE: 'application/ACCEPT.FAILURE',
        },
        method: 'POST',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('applyForJob', () => {
    const args = ['jobId', callback]
    const result = applyForJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/applications/apply',
        types: {
          REQUEST: 'application/APPLY.REQUEST',
          SUCCESS: 'application/APPLY.SUCCESS',
          FAILURE: 'application/APPLY.FAILURE',
        },
        method: 'POST',
        query: {
          jobId: 'jobId',
        },
        meta: {
          jobId: 'jobId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('rejectApplication', () => {
    const args = ['applicationId', callback]
    const result = rejectApplication(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/applications/applicationId/reject`,
        types: {
          REQUEST: 'application/REJECT.REQUEST',
          SUCCESS: 'application/REJECT.SUCCESS',
          FAILURE: 'application/REJECT.FAILURE',
        },
        method: 'POST',
        meta: {
          applicationId: 'applicationId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('hireOnApplication', () => {
    const args = [
      {
        jobId: 'jobId',
        userId: 'userId',
        startDate: 'startDate',
        budget: '3213',
        currency: 'USD',
      },
      callback,
    ]
    const result = hireOnApplication(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/applications/hire',
        types: {
          REQUEST: 'application/HIRE.REQUEST',
          SUCCESS: 'application/HIRE.SUCCESS',
          FAILURE: 'application/HIRE.FAILURE',
        },
        method: 'POST',
        query: {
          jobId: args[0].jobId,
          userId: args[0].userId,
          startDate: args[0].startDate,
          budget: args[0].budget,
          currency: args[0].currency,
        },
        meta: {
          jobId: args[0].jobId,
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
