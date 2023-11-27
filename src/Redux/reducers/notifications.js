import { createReducer } from 'Helpers/redux'
import { inSocketTypes } from 'Constants/socketEventTypes'
import _ from 'lodash'

import { SIGN_OUT } from 'Redux/actions/auth'
import { LOAD_NOTIFICATIONS, MARK_AS_READ } from 'Redux/actions/notifications'

const initialState = {
  data: [],
  isListEnd: false,
}

const handlers = {
  [LOAD_NOTIFICATIONS.SUCCESS]: (state, { payload }) => ({
    ...state,
    data: _.isArray(payload.list) ? payload.list : state.data,
    isListEnd: payload.isListEnd || state.isListEnd,
  }),
  [`socket/${inSocketTypes.notificationReceived.toUpperCase()}`]: (
    state,
    { payload },
  ) => ({
    ...state,
    data:
      payload.notificationType === 'jobUnavailable'
        ? state.data
        : _.uniqBy([payload, ...state.data], '_id'),
  }),
  [MARK_AS_READ.SUCCESS]: (state, { meta }) => ({
    ...state,
    data: state.data.map(el =>
      meta.notifications.indexOf(el._id) === -1
        ? el
        : {
            ...el,
            read: true,
          },
    ),
  }),
  [SIGN_OUT.REQUEST]: () => initialState,
}

export default createReducer(initialState, handlers)
