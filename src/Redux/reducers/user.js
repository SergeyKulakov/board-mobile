import { createReducer } from 'Helpers/redux'
import { getLinkArray } from 'Helpers/redux/user'
import _ from 'lodash'

import {
  GET_USER,
  UPDATE_USER_ATTRIBUTES,
  VERIFY_USER_ATTRIBUTES,
} from 'Redux/actions/user'
import { SIGN_OUT, SIGN_IN } from 'Redux/actions/auth'
import { ADS_VIEWED } from 'Redux/actions/subscription'

const initialState = {
  user: {},
  isRequest: false,
}

const handlers = {
  [GET_USER.REQUEST]: state => ({
    ...state,
    isRequest: true,
  }),
  [GET_USER.FAILURE]: state => ({
    ...state,
    user: initialState.user,
    isRequest: false,
  }),
  [GET_USER.SUCCESS]: (state, { payload }) => ({
    ...state,
    user: {
      ...initialState.user,
      ...payload,
      services: (payload.services || []).map(el =>
        el.categoryId === el._id ? { ...el, categoryId: undefined } : el,
      ),
      isPremium: Boolean(payload.isPremium),
      videoLinks: getLinkArray(payload.videoLinks) || [],
      websiteLinks: getLinkArray(payload.websiteLinks) || [],
      phone_number_verified: 'true', // todo remove this when will be connected phone number verification
    },
    isRequest: false,
  }),
  [UPDATE_USER_ATTRIBUTES.SUCCESS]: (state, { payload }) => ({
    ...state,
    user: {
      ...initialState.user,
      ...payload,
      services: (payload.services || []).map(el =>
        el.categoryId === el._id ? { ...el, categoryId: undefined } : el,
      ),
      videoLinks: getLinkArray(payload.videoLinks),
      websiteLinks: getLinkArray(payload.websiteLinks),
      phone_number_verified: 'true', // todo remove this when will be connected phone number verification
    },
  }),
  [SIGN_OUT.REQUEST]: () => ({ ...initialState }),
  [SIGN_IN.SUCCESS]: (state, { payload }) => ({
    ...state,
    user: {
      ...state.user,
      ...payload.user,
      services: (payload.user.services || []).map(el =>
        el.categoryId === el._id ? { ...el, categoryId: undefined } : el,
      ),
      isPremium: Boolean(payload.user.isPremium),
      videoLinks: getLinkArray(payload.user.videoLinks) || [],
      websiteLinks: getLinkArray(payload.user.websiteLinks) || [],
    },
  }),
  [ADS_VIEWED.SUCCESS]: state => ({
    ...state,
    user: {
      ...state.user,
      ptsAmount: _.get(state, 'user.ptsAmount', 0) + 1,
    },
  }),
  [VERIFY_USER_ATTRIBUTES.SUCCESS]: (state, { meta }) => ({
    ...state,
    user: {
      ...state.user,
      [meta.changedAttrKey]: 'true',
    },
  }),
}

export default createReducer(initialState, handlers)
