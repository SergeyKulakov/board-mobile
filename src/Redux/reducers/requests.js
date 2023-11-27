import { createReducer } from 'Helpers/redux'
import _ from 'lodash'

import {
  LOAD_REQUESTS_JOBS,
  LOAD_REQUESTS_SP,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
} from 'Redux/actions/requests'
import {
  ADD_FAVORITE as ADD_FAVORITE_SP,
  DELETE_FAVORITE as DELETE_FAVORITE_SP,
} from 'Redux/actions/serviceProviders'
import {
  ADD_FAVORITE as ADD_FAVORITE_JOB,
  DELETE_FAVORITE as DELETE_FAVORITE_JOB,
} from 'Redux/actions/jobs'
import { SIGN_OUT } from 'Redux/actions/auth'

const initialState = {
  jobs: [],
  serviceProviders: [],
}

const handlers = {
  [LOAD_REQUESTS_JOBS.SUCCESS]: (state, { payload }) => ({
    ...state,
    jobs: payload.list,
  }),
  [LOAD_REQUESTS_SP.SUCCESS]: (state, { payload }) => ({
    ...state,
    serviceProviders: _.uniqBy(payload.list, 'doer.username'),
  }),
  [ACCEPT_REQUEST.REQUEST]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.filter(el => el.jobRequest._id !== meta.jobRequestId),
  }),
  [REJECT_REQUEST.REQUEST]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.filter(el => el.jobRequest._id !== meta.requestId),
  }),
  [ADD_FAVORITE_SP.SUCCESS]: (state, { payload: { spId, _id } }) => ({
    ...state,
    serviceProviders: state.serviceProviders.map(el =>
      _.get(el, 'doer.username') === spId
        ? { ...el, doer: { ...el.doer, favouriteId: _id } }
        : el,
    ),
  }),
  [DELETE_FAVORITE_SP.REQUEST]: (state, { meta }) => ({
    ...state,
    serviceProviders: state.serviceProviders.map(el =>
      _.get(el, 'doer.favouriteId') === meta.id
        ? { ...el, doer: { ...el.doer, favouriteId: null } }
        : el,
    ),
  }),
  [ADD_FAVORITE_JOB.SUCCESS]: (state, { payload: { jobId, _id } }) => ({
    ...state,
    jobs: state.jobs.map(el =>
      el._id === jobId ? { ...el, favouriteId: _id } : el,
    ),
  }),
  [DELETE_FAVORITE_JOB.SUCCESS]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.map(el =>
      el.favouriteId === meta.id ? { ...el, favouriteId: null } : el,
    ),
  }),
  [SIGN_OUT.REQUEST]: () => ({ ...initialState }),
}

export default createReducer(initialState, handlers)
