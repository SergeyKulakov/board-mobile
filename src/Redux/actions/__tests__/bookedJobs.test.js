import { getParamsWithUnits } from 'Helpers/redux/user'
import { loadBookedJobs, cancelBookedJob } from '../bookedJobs'

describe('actions/bookedJobs', () => {
  const callback = () => null

  it('loadBookedJobs', () => {
    const args = [{ filter: 'filter' }, callback]
    const result = loadBookedJobs(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/jobs/booked',
        types: {
          REQUEST: 'bookedJobs/LOAD.REQUEST',
          SUCCESS: 'bookedJobs/LOAD.SUCCESS',
          FAILURE: 'bookedJobs/LOAD.FAILURE',
        },
        method: 'GET',
        params: {
          filter: 'filter',
          elements_per_page: 1000,
          no_geolocation_filter: true,
        },
        meta: {
          filters: {
            filter: 'filter',
          },
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('cancelBookedJob', () => {
    const args = ['jobId', 'reason', callback]
    const result = cancelBookedJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/jobs/jobId/cancele`,
        types: {
          REQUEST: 'bookedJobs/CANCEL.REQUEST',
          SUCCESS: 'bookedJobs/CANCEL.SUCCESS',
          FAILURE: 'bookedJobs/CANCEL.FAILURE',
        },
        method: 'POST',
        meta: {
          jobId: 'jobId',
        },
        query: {
          reason: 'reason',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
