import { createReducer } from 'Helpers/redux'
import _ from 'lodash'
import statuses from 'Constants/statuses'
import {
  LOAD_APPLIED_JOBS,
  CANCEL_APPLIED_JOB,
} from 'Redux/actions/appliedJobs'
import { ADD_FAVORITE, DELETE_FAVORITE } from 'Redux/actions/jobs'
import { SIGN_OUT } from 'Redux/actions/auth'

const initialState = {
  list: [],
  filters: {},
}

const handlers = {
  [LOAD_APPLIED_JOBS.REQUEST]: (state, { meta }) => ({
    ...state,
    filters: meta.filters,
  }),
  [LOAD_APPLIED_JOBS.SUCCESS]: (state, { payload }) => ({
    ...state,
    list: _.uniqBy(payload.list, '_id').filter(
      el => el.jobStatus === statuses.posted,
    ),
  }),
  [CANCEL_APPLIED_JOB.REQUEST]: (state, { meta }) => ({
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
  [SIGN_OUT.REQUEST]: () => initialState,
}

export default createReducer(initialState, handlers)
