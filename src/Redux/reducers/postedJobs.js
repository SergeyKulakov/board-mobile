import { createReducer } from 'Helpers/redux'
import _ from 'lodash'
import {
  LOAD_POSTED_JOBS,
  REMOVE_USER_JOB,
  UPDATE_USER_JOB,
} from 'Redux/actions/postedJobs'
import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  POST_USER_VACANCY,
} from 'Redux/actions/jobs'
import { SIGN_OUT } from 'Redux/actions/auth'
import { HIRE } from 'Redux/actions/applications'

const initialState = {
  list: [],
  filters: {},
}

const handlers = {
  [LOAD_POSTED_JOBS.SUCCESS]: (state, { payload }) => ({
    ...state,
    list: _.uniqBy(payload.list, '_id'),
  }),
  [LOAD_POSTED_JOBS.REQUEST]: (state, { meta }) => ({
    ...state,
    filters: meta.filters || {},
  }),
  [ADD_FAVORITE.SUCCESS]: (state, { payload: { _id, jobId } }) => ({
    ...state,
    list: state.list.map(el =>
      el._id === jobId ? { ...el, favouriteId: _id } : el,
    ),
  }),
  [DELETE_FAVORITE.SUCCESS]: (state, { meta }) => ({
    ...state,
    list: state.list.filter(el =>
      el.favouriteId === meta.id ? { ...el, favouriteId: undefined } : el,
    ),
  }),
  [REMOVE_USER_JOB.REQUEST]: (state, { meta }) => ({
    ...state,
    list: state.list.filter(el => el._id !== meta.jobId),
  }),
  // [UPDATE_USER_JOB.SUCCESS]: (state, { payload }) => ({
  //   ...state,
  //   list: state.list.map(el =>
  //     el._id === payload._id ? { ...el, ...payload } : el,
  //   ),
  // }),
  [HIRE.SUCCESS]: (state, { meta }) => ({
    ...state,
    list: state.list.filter(el => el._id !== meta.jobId),
  }),
  [SIGN_OUT.REQUEST]: () => initialState,
}

export default createReducer(initialState, handlers)
