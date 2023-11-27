import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'

export const DELETE_MY_ACCOUNT = createAsyncAction('settings/DELETE_ACCOUNT')
export const deleteAccount = (reason, callback) =>
  apiCall({
    endpoint: '/user/delete',
    types: DELETE_MY_ACCOUNT,
    method: 'POST',
    query: {
      deletionReason: reason,
    },
    callback,
  })

export const SET_PREFERRED_LANGUAGE = createAsyncAction('settings/SET_LANGUAGE')
export const setPreferredLanguage = language =>
  apiCall({
    endpoint: '/user',
    types: SET_PREFERRED_LANGUAGE,
    method: 'PUT',
    query: {
      preferredLanguage: language,
    },
  })

export const SET_JOB_ALERTS = createAsyncAction('settings/SET_JOB_ALERTS')
export const setJobAlerts = bool =>
  apiCall({
    endpoint: '/user',
    types: SET_JOB_ALERTS,
    method: 'PUT',
    meta: {
      value: bool,
    },
    query: {
      settings_job_allerts: bool,
    },
  })

export const SET_ACCOUNT_STATUS = createAsyncAction(
  'settings/SET_ACCOUNT_STATUS',
)
export const setAccountStatus = bool =>
  apiCall({
    endpoint: '/user',
    types: SET_ACCOUNT_STATUS,
    method: 'PUT',
    meta: {
      value: bool,
    },
    query: {
      account_status: bool ? 'enabled' : 'disabled',
    },
  })

export const SET_NOTIFICATIONS = createAsyncAction('settings/SET_NOTIFICATIONS')
export const setNotifications = bool =>
  apiCall({
    endpoint: '/user',
    types: SET_NOTIFICATIONS,
    method: 'PUT',
    meta: {
      value: bool,
    },
    query: {
      settings_notif: bool,
    },
  })

export const CHANGE_PASSWORD = createAsyncAction('settings/CHANGE_PASSWORD')
export const changePassword = (oldPassword, newPassword, callback) =>
  apiCall({
    endpoint: '/user/update-password',
    types: CHANGE_PASSWORD,
    method: 'POST',
    query: {
      oldPassword,
      newPassword,
    },
    callback,
  })
