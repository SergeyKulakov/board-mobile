import { createReducer } from 'Helpers/redux'
import _ from 'lodash'

import {
  LOAD_USER_REVIEWS,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  LOAD_REVIEWED_SP,
} from 'Redux/actions/review'
import { getLinkArray } from 'Helpers/redux/user'

const initialState = {
  data: {},
  profile: {},
}

const handlers = {
  [LOAD_USER_REVIEWS.REQUEST]: state => ({
    ...state,
    data: {},
  }),
  [LOAD_USER_REVIEWS.SUCCESS]: (state, { payload }) => ({
    ...state,
    data: _.zipObject(payload.map(el => el._id), payload),
  }),
  [UPDATE_REVIEW.SUCCESS]: (state, { payload }) => ({
    ...state,
    data: {
      ...state.data,
      [payload._id]: {
        ...payload,
        author: _.get(state, `data[${payload._id}].author`, {}),
      },
    },
  }),
  [LOAD_REVIEWED_SP.SUCCESS]: (state, { payload }) => ({
    ...state,
    profile: {
      ...payload,
      videoLinks: getLinkArray(payload.videoLinks),
      websiteLinks: getLinkArray(payload.websiteLinks),
    },
  }),
  [DELETE_REVIEW.REQUEST]: (state, { meta }) => {
    const { data } = state

    delete data[meta.reviewId]

    return {
      ...state,
      data: { ...data },
    }
  },
}

export default createReducer(initialState, handlers)
