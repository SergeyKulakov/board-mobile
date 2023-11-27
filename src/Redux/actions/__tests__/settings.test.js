import {
  setPreferredLanguage,
  changePassword,
  deleteAccount,
  setAccountStatus,
  setJobAlerts,
  setNotifications,
} from '../settings'

describe('actions/settings', () => {
  const callback = () => null

  it('setPreferredLanguage', () => {
    const args = ['language']
    const result = setPreferredLanguage(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user',
        types: {
          REQUEST: 'settings/SET_LANGUAGE.REQUEST',
          SUCCESS: 'settings/SET_LANGUAGE.SUCCESS',
          FAILURE: 'settings/SET_LANGUAGE.FAILURE',
        },
        method: 'PUT',
        query: {
          preferredLanguage: 'language',
        },
      },
      type: 'API_CALL',
    })
  })

  it('changePassword', () => {
    const args = ['oldPassword', 'newPassword', callback]
    const result = changePassword(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user/update-password',
        types: {
          REQUEST: 'settings/CHANGE_PASSWORD.REQUEST',
          SUCCESS: 'settings/CHANGE_PASSWORD.SUCCESS',
          FAILURE: 'settings/CHANGE_PASSWORD.FAILURE',
        },
        method: 'POST',
        query: {
          oldPassword: 'oldPassword',
          newPassword: 'newPassword',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('deleteAccount', () => {
    const args = ['reason', callback]
    const result = deleteAccount(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user/delete',
        types: {
          REQUEST: 'settings/DELETE_ACCOUNT.REQUEST',
          SUCCESS: 'settings/DELETE_ACCOUNT.SUCCESS',
          FAILURE: 'settings/DELETE_ACCOUNT.FAILURE',
        },
        method: 'POST',
        query: {
          deletionReason: 'reason',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('setAccountStatus', () => {
    const args = [true]
    const result = setAccountStatus(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user',
        types: {
          REQUEST: 'settings/SET_ACCOUNT_STATUS.REQUEST',
          SUCCESS: 'settings/SET_ACCOUNT_STATUS.SUCCESS',
          FAILURE: 'settings/SET_ACCOUNT_STATUS.FAILURE',
        },
        method: 'PUT',
        meta: {
          value: true,
        },
        query: {
          account_status: 'enabled',
        },
      },
      type: 'API_CALL',
    })
  })

  it('setJobAlerts', () => {
    const args = [true]
    const result = setJobAlerts(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user',
        types: {
          REQUEST: 'settings/SET_JOB_ALERTS.REQUEST',
          SUCCESS: 'settings/SET_JOB_ALERTS.SUCCESS',
          FAILURE: 'settings/SET_JOB_ALERTS.FAILURE',
        },
        method: 'PUT',
        meta: {
          value: true,
        },
        query: {
          settings_job_allerts: true,
        },
      },
      type: 'API_CALL',
    })
  })

  it('setNotifications', () => {
    const args = [true]
    const result = setNotifications(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user',
        types: {
          REQUEST: 'settings/SET_NOTIFICATIONS.REQUEST',
          SUCCESS: 'settings/SET_NOTIFICATIONS.SUCCESS',
          FAILURE: 'settings/SET_NOTIFICATIONS.FAILURE',
        },
        method: 'PUT',
        meta: {
          value: true,
        },
        query: {
          settings_notif: true,
        },
      },
      type: 'API_CALL',
    })
  })
})
