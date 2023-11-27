import { createReducer } from 'Helpers/redux'
import { inSocketTypes } from 'Constants/socketEventTypes'
import { safeJsonParse } from 'Helpers/saveJsonParse'

import { LOAD_TRACK_JOBS } from 'Redux/actions/track'
import { CANCEL_BOOKED_JOB } from 'Redux/actions/bookedJobs'
import { SIGN_OUT } from 'Redux/actions/auth'

const initialState = {
  jobs: [],
  geolocation: null,
}

const handlers = {
  [LOAD_TRACK_JOBS.SUCCESS]: (state, { payload }) => ({
    ...state,
    jobs: payload,
  }),
  [`socket/${inSocketTypes.spTrackUpdated.toUpperCase()}`]: (
    state,
    { payload },
  ) => ({
    ...state,
    geolocation: safeJsonParse(payload.geolocation)[1],
  }),
  [CANCEL_BOOKED_JOB.REQUEST]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.filter(el => el._id !== meta.jobId),
  }),
  [SIGN_OUT.REQUEST]: () => ({ ...initialState }),
}

export default createReducer(initialState, handlers)
