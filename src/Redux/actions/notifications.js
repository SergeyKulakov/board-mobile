import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { secondApi } from 'Constants/api'

export const LOAD_NOTIFICATIONS = createAsyncAction('notifications/LOAD')
export const loadNotifications = callback =>
  apiCall({
    url: secondApi,
    endpoint: '/notification/list',
    types: LOAD_NOTIFICATIONS,
    method: 'GET',
    params: {
      elements_per_page: 20,
    },
    callback,
  })

export const MARK_AS_READ = createAsyncAction('notifications/MARK_READ')
export const markNotificationsAsRead = (notifications = [], callback) =>
  apiCall({
    url: secondApi,
    endpoint: '/notification/mark-as-read',
    types: MARK_AS_READ,
    method: 'POST',
    meta: {
      notifications,
    },
    query: {
      notificationsIds: notifications,
    },
    callback,
  })
