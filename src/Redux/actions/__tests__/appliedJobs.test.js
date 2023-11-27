import { getParamsWithUnits } from 'Helpers/redux/user'
import {
  loadAppliedJobs,
  cancelAppliedJob,
  CANCEL_APPLIED_JOB,
} from '../appliedJobs'

describe('actions/appliedJobs', () => {
  const callback = () => null

  it('loadAppliedJobs', () => {
    const args = [{ filter: 'filter' }, callback]
    const result = loadAppliedJobs(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/applications',
        types: {
          REQUEST: 'appliedJobs/LOAD.REQUEST',
          SUCCESS: 'appliedJobs/LOAD.SUCCESS',
          FAILURE: 'appliedJobs/LOAD.FAILURE',
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

  it('cancelAppliedJob', () => {
    const args = ['jobId', 'reason', callback]
    const result = cancelAppliedJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/jobs/jobId/cancele`,
        types: CANCEL_APPLIED_JOB,
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
