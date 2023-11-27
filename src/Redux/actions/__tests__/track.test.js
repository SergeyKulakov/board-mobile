import { getParamsWithUnits } from 'Helpers/redux/user'
import { filteredBookedJobs } from 'Helpers/jobs'
import { outSocketTypes } from 'Constants/socketEventTypes'
import {
  loadTrackJobs,
  subscribeTrack,
  unsubscribeSpTrack,
  updateTrack,
} from '../track'

describe('actions/track', () => {
  const callback = () => null

  it('loadTrackJobs', () => {
    const args = [callback]
    const result = loadTrackJobs(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/jobs/booked',
        types: {
          REQUEST: 'track/LOAD_JOBS.REQUEST',
          SUCCESS: 'track/LOAD_JOBS.SUCCESS',
          FAILURE: 'track/LOAD_JOBS.FAILURE',
        },
        method: 'GET',
        params: {
          elements_per_page: 1000,
          no_geolocation_filter: true,
        },
        preFormat: getParamsWithUnits,
        postFormat: filteredBookedJobs,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('subscribeTrack', () => {
    const args = ['userId']
    const result = subscribeTrack(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: outSocketTypes.subscribeSpTrack,
        types: {
          event: 'track/SUBSCRIBE',
        },
        query: {
          spId: 'userId',
        },
      },
      type: 'SOCKET_EVENT',
    })
  })

  it('unsubscribeSpTrack', () => {
    const args = ['userId']
    const result = unsubscribeSpTrack(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: outSocketTypes.unsubscribeSpTrack,
        types: {
          event: 'track/UNSUBSCRIBE_TRACK',
        },
        query: {
          spId: 'userId',
        },
      },
      type: 'SOCKET_EVENT',
    })
  })

  it('updateTrack', () => {
    const args = [{ lat: 12.3214, lon: 12.321 }]
    const result = updateTrack(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: outSocketTypes.updateSpTrack,
        types: {
          event: 'track/UPDATE_TRACK',
        },
        query: {
          geolocation: JSON.stringify(args[0]),
        },
      },
      type: 'SOCKET_EVENT',
    })
  })
})
