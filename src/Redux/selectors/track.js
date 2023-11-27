import { createSelector } from 'reselect'

const getData = store => store.track

export const getTrackJobs = createSelector(
  getData,
  data => data.jobs,
)

export const getGeolocation = createSelector(
  getData,
  data => data.geolocation,
)
