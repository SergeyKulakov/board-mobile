import { createReducer } from 'Helpers/redux'
import { LOAD_BOOKED_JOBS, CANCEL_BOOKED_JOB } from 'Redux/actions/bookedJobs'
import { ADD_FAVORITE, DELETE_FAVORITE, MARK_AS } from 'Redux/actions/jobs'
import { SIGN_OUT } from 'Redux/actions/auth'
import statuses from 'Constants/statuses'

const initialState = {
  list: [],
  filters: {},
}

const handlers = {
  [LOAD_BOOKED_JOBS.REQUEST]: (state, { meta }) => ({
    ...state,
    filters: meta.filters,
  }),
  [LOAD_BOOKED_JOBS.SUCCESS]: (state, { payload }) => ({
    ...state,
    list: payload.list.filter(
      el =>
        el.jobStatus === statuses.booked ||
        el.jobStatus === statuses.completed ||
        el.jobStatus === statuses.done,
    ),
  }),
  [CANCEL_BOOKED_JOB.REQUEST]: (state, { meta }) => ({
    ...state,
    list: state.list.filter(el => el._id !== meta.jobId),
  }),
  [ADD_FAVORITE.SUCCESS]: (state, { payload: { _id, jobId } }) => ({
    ...state,
    list: state.list.map(el =>
      el._id === jobId ? { ...el, favouriteId: _id } : el,
    ),
  }),
  [DELETE_FAVORITE.SUCCESS]: (state, { meta }) => ({
    ...state,
    list: state.list.map(el =>
      el.favouriteId === meta.id ? { ...el, favouriteId: undefined } : el,
    ),
  }),
  [MARK_AS.SUCCESS]: (state, { payload }) => ({
    ...state,
    list: state.list.map(el =>
      el._id === payload._id ? { ...el, jobStatus: payload.jobStatus } : el,
    ),
  }),
  [SIGN_OUT.REQUEST]: () => ({ ...initialState }),
}

export default createReducer(initialState, handlers)
