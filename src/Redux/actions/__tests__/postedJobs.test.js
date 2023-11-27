import { getPostedJobRequestFormat } from 'Helpers/jobs'
import { loadPostedJobs, removeUserJob, updateUserJob } from '../postedJobs'

describe('postedJobs', () => {
  const callback = () => null

  it('loadPostedJobs', () => {
    const args = [{}, {}, callback]
    const result = loadPostedJobs(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/jobs',
        types: {
          REQUEST: 'postedJobs/LOAD.REQUEST',
          SUCCESS: 'postedJobs/LOAD.SUCCESS',
          FAILURE: 'postedJobs/LOAD.FAILURE',
        },
        method: 'GET',
        params: {
          elements_per_page: 100,
          no_geolocation_filter: true,
        },
        meta: {
          filters: {},
        },
        preFormat: getPostedJobRequestFormat,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('removeUserJob', () => {
    const args = ['jobId', callback]
    const result = removeUserJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/job/jobId`,
        types: {
          REQUEST: 'postedJobs/REMOVE_USER_JOB.REQUEST',
          SUCCESS: 'postedJobs/REMOVE_USER_JOB.SUCCESS',
          FAILURE: 'postedJobs/REMOVE_USER_JOB.FAILURE',
        },
        method: 'DELETE',
        meta: {
          jobId: 'jobId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('updateUserJob', () => {
    const args = ['jobId', {}, callback]
    const result = updateUserJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/job/jobId`,
        types: {
          REQUEST: 'postedJobs/UPDATE_USER_JOB.REQUEST',
          SUCCESS: 'postedJobs/UPDATE_USER_JOB.SUCCESS',
          FAILURE: 'postedJobs/UPDATE_USER_JOB.FAILURE',
        },
        method: 'PUT',
        query: {},
        callback,
      },
      type: 'API_CALL',
    })
  })
})
