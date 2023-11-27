import { createAsyncAction, createSocketAction } from 'Helpers/redux'
import { apiCall, socketEvent } from 'Redux/actions/api'
import { outSocketTypes } from 'Constants/socketEventTypes'
import { getParamsWithUnits } from 'Helpers/redux/user'
import { filteredBookedJobs } from 'Helpers/jobs'

export const LOAD_TRACK_JOBS = createAsyncAction('track/LOAD_JOBS')
export const loadTrackJobs = callback =>
  apiCall({
    endpoint: '/jobs/booked',
    types: LOAD_TRACK_JOBS,
    method: 'GET',
    params: {
      elements_per_page: 1000,
      no_geolocation_filter: true,
    },
    preFormat: getParamsWithUnits,
    postFormat: filteredBookedJobs,
    callback,
  })

export const UPDATE_TRACK = createSocketAction('track/UPDATE_TRACK')
export const updateTrack = geolocation =>
  socketEvent({
    endpoint: outSocketTypes.updateSpTrack,
    types: UPDATE_TRACK,
    query: {
      geolocation: JSON.stringify(geolocation),
    },
  })

export const SUBSCRIBE_TRACK = createSocketAction('track/SUBSCRIBE')
export const subscribeTrack = userId =>
  socketEvent({
    endpoint: outSocketTypes.subscribeSpTrack,
    types: SUBSCRIBE_TRACK,
    query: {
      spId: userId,
    },
  })

export const UNSUBSCRIBE_TRACK = createSocketAction('track/UNSUBSCRIBE_TRACK')
export const unsubscribeSpTrack = userId =>
  socketEvent({
    endpoint: outSocketTypes.unsubscribeSpTrack,
    types: UNSUBSCRIBE_TRACK,
    query: {
      spId: userId,
    },
  })
