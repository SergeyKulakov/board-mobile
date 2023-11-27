import { createReducer } from 'Helpers/redux'

import { SET_LANGUAGE } from 'Redux/actions/language'
import {
  SET_ACCOUNT_STATUS,
  SET_JOB_ALERTS,
  SET_NOTIFICATIONS,
} from 'Redux/actions/settings'
import { SIGN_OUT } from 'Redux/actions/auth'
import { GET_USER } from 'Redux/actions/user'

const initialState = {
  settings: {
    notifications: true,
    jobAlerts: true,
    accountActive: true,
  },
  language: 'en',
}

const handlers = {
  [GET_USER.SUCCESS]: (state, { payload }) => ({
    ...state,
    settings: {
      notifications: payload.settings_notif,
      jobAlerts: payload.settings_job_allerts,
      accountActive: payload.account_status === 'enabled',
    },
  }),
  [SET_ACCOUNT_STATUS.REQUEST]: (state, { meta }) => ({
    ...state,
    settings: {
      ...state.settings,
      accountActive: meta.value,
    },
  }),
  [SET_JOB_ALERTS.REQUEST]: (state, { meta }) => ({
    ...state,
    settings: {
      ...state.settings,
      jobAlerts: meta.value,
    },
  }),
  [SET_NOTIFICATIONS.REQUEST]: (state, { meta }) => ({
    ...state,
    settings: {
      ...state.settings,
      notifications: meta.value,
    },
  }),
  [SET_LANGUAGE.SUCCESS]: (state, { language }) => ({
    ...state,
    language,
  }),
  [SET_LANGUAGE.FAILURE]: (state, { language }) => ({
    ...state,
    language,
  }),
  [SIGN_OUT.REQUEST]: state => ({
    ...state,
    settings: initialState.settings,
  }),
}

export default createReducer(initialState, handlers)
