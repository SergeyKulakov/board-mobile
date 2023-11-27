import { createReducer } from 'Helpers/redux'
import _ from 'lodash'

import {
  LOAD_PLANS,
  ADS_VIEWED,
  LOAD_PTS_COST,
  SEND_TRANSACTION,
} from 'Redux/actions/subscription'
import { GET_USER } from 'Redux/actions/user'

const initialState = {
  data: {},
  points: 0,
  pointsExpiryDate: null,
  price: {},
  activePlan: null,
}

const handlers = {
  [LOAD_PLANS.SUCCESS]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  [ADS_VIEWED.SUCCESS]: state => ({
    ...state,
    // points: state.points + 1,
  }),
  [GET_USER.SUCCESS]: (state, { payload }) => ({
    ...state,
    points: payload.ptsAmount,
    activePlan: payload.activeSubscription,
    pointsExpiryDate: payload.ptsExpirationDate,
  }),
  [SEND_TRANSACTION.SUCCESS]: (state, { payload }) => ({
    ...state,
    points: state.points + _.get(payload, 'ptsOperations[0].amount', 0),
  }),
  [LOAD_PTS_COST.SUCCESS]: (state, { payload }) => ({
    ...state,
    price: payload,
  }),
}

export default createReducer(initialState, handlers)
