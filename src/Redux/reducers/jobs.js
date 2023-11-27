import { createReducer } from 'Helpers/redux'
import { getLinkArray } from 'Helpers/redux/user'
import _ from 'lodash'
import statuses from 'Constants/statuses'

import {
  LOAD_JOBS_LIST,
  LOAD_SPECIFIC,
  POST_USER_VACANCY,
  LOAD_FAVORITE,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  REMOVE_JOB,
  MARK_AS,
  INVALID_JOB,
} from 'Redux/actions/jobs'
import { SIGN_OUT } from 'Redux/actions/auth'
import { REMOVE_USER_JOB } from 'Redux/actions/postedJobs'
import { CANCEL_BOOKED_JOB } from 'Redux/actions/bookedJobs'
import { CANCEL_APPLIED_JOB } from 'Redux/actions/appliedJobs'
import {
  APPLY_FOR_JOB,
  ACCEPT_APPLICATION,
  REJECT_APPLICATION,
  HIRE,
} from 'Redux/actions/applications'
import { ACCEPT_REQUEST, REJECT_REQUEST } from 'Redux/actions/requests'
import { SET_ACCOUNT_STATUS } from 'Redux/actions/settings'

import { filteredRemovedJobs } from 'Helpers/redux/removedItems'

const initialState = {
  jobs: [],
  favorites: [],
  vacancy: null,
  removedIds: [],
  filters: {},
  page: 0,
  isEndJobsList: false,
}

const handlers = {
  [LOAD_JOBS_LIST.REQUEST]: (state, { meta }) => ({
    ...state,
    filters: meta.filters,
    removedIds: meta.isClearRemoved ? [] : state.removedIds,
  }),
  [LOAD_JOBS_LIST.SUCCESS]: (state, { payload, meta: { isPagination } }) => {
    const result = isPagination
      ? [...state.jobs, ...payload.list]
      : payload.list
    return {
      ...state,
      jobs: filteredRemovedJobs(result, state.removedIds),
      isEndJobsList: payload.isListEnd,
      page: isPagination ? state.page + 1 : 0,
    }
  },
  [LOAD_JOBS_LIST.FAILURE]: state => ({
    ...state,
    jobs: initialState.jobs,
  }),
  [LOAD_SPECIFIC.SUCCESS]: (state, { payload }) => ({
    ...state,
    vacancy: {
      ...payload,
      jobRequests:
        payload.jobStatus === statuses.booked ? [] : payload.jobRequests,
      videoLinks: getLinkArray(payload.videoLinks),
      peopleWhoApplied: _.get(payload, 'peopleWhoApplied', []).filter(el =>
        _.isObject(el.user),
      ),
    },
  }),
  [LOAD_SPECIFIC.FAILURE]: (state, { payload }) => {
    const jobId = _.get(payload, 'data.jobId')

    if (jobId) {
      return {
        ...state,
        jobs: state.jobs.filter(el => el._id !== jobId),
        vacancy: null,
        removedIds: [...state.removedIds, jobId],
      }
    }

    return { ...state }
  },

  [APPLY_FOR_JOB.SUCCESS]: (state, { payload, meta }) => ({
    ...state,
    jobs: state.jobs.map(el =>
      el._id === meta.jobId
        ? {
            ...el,
            applicationId: payload._id,
          }
        : el,
    ),
    vacancy:
      _.get(state, 'vacancy._id') === payload.jobId
        ? {
            ...state.vacancy,
            applicationId: payload._id,
          }
        : state.vacancy,
    favorites: (state.favorites || []).map(el =>
      el._id === meta.jobId
        ? {
            ...el,
            applicationId: payload._id,
          }
        : el,
    ),
  }),
  [LOAD_FAVORITE.SUCCESS]: (state, { payload }) => ({
    ...state,
    favorites: payload.list.filter(el => el.jobStatus === statuses.posted),
  }),
  [ADD_FAVORITE.SUCCESS]: (state, { payload }) => {
    let nextVacancy = null

    if (state.vacancy && state.vacancy._id === payload.jobId)
      nextVacancy = { ...state.vacancy, favouriteId: payload._id }

    return {
      ...state,
      jobs: state.jobs.map(el =>
        el._id === payload.jobId ? { ...el, favouriteId: payload._id } : el,
      ),
      vacancy: nextVacancy,
    }
  },
  [DELETE_FAVORITE.REQUEST]: (state, { meta }) => {
    const nextVacancy = state.vacancy

    if (nextVacancy && nextVacancy.favouriteId === meta.id)
      nextVacancy.favouriteId = null

    return {
      ...state,
      jobs: state.jobs.map(el =>
        el.favouriteId === meta.id ? { ...el, favouriteId: null } : el,
      ),
      favorites: state.favorites.filter(el => el.favouriteId !== meta.id),
      vacancy: nextVacancy,
    }
  },
  [REMOVE_JOB]: (state, { id }) => ({
    ...state,
    jobs: state.jobs.filter(el => el._id !== id),
    removedIds: [...state.removedIds, id],
  }),
  [REMOVE_USER_JOB.REQUEST]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.filter(el => el._id !== meta.jobId),
  }),
  [ACCEPT_APPLICATION.SUCCESS]: (state, { payload }) => ({
    ...state,
    vacancy: {
      ...state.vacancy,
      peopleWhoApplied: (state.vacancy.peopleWhoApplied || []).map(el =>
        el._id === payload._id ? { ...el, ...payload } : el,
      ),
    },
  }),
  [REJECT_APPLICATION.REQUEST]: (state, { meta }) => ({
    ...state,
    vacancy: {
      ...state.vacancy,
      peopleWhoApplied: (state.vacancy.peopleWhoApplied || []).filter(
        el => el._id !== meta.applicationId,
      ),
    },
  }),
  [MARK_AS.SUCCESS]: (state, { payload }) => ({
    ...state,
    vacancy:
      _.get(state, 'vacancy._id') === payload._id
        ? { ...state.vacancy, jobStatus: payload.jobStatus }
        : state.vacancy,
  }),
  [CANCEL_BOOKED_JOB.REQUEST]: state => ({
    ...state,
    vacancy: null,
  }),
  [CANCEL_APPLIED_JOB.REQUEST]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.filter(el => el._id !== meta.jobId),
    vacancy: null,
  }),
  [HIRE.SUCCESS]: (state, { meta }) => ({
    ...state,
    jobs: state.jobs.filter(el => el._id !== meta.jobId),
  }),
  [INVALID_JOB]: (state, { payload }) =>
    payload.jobId
      ? {
          ...state,
          jobs: state.jobs.filter(el => el._id !== payload.jobId),
          vacancy: null,
          removedIds: [...state.removedIds, payload.jobId],
        }
      : { ...state },
  [SET_ACCOUNT_STATUS.REQUEST]: state => ({
    ...state,
    vacancy: null,
  }),
  [ACCEPT_REQUEST.SUCCESS]: state => ({
    ...state,
    vacancy: null,
  }),
  [REJECT_REQUEST.SUCCESS]: state => ({
    ...state,
    vacancy: null,
  }),
  [SIGN_OUT.REQUEST]: () => initialState,
}

export default createReducer(initialState, handlers)
