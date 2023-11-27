import { formatUserRequestParams } from 'Helpers/user'
import {
  loadUserData,
  resendVerifyCode,
  updateUserAttributes,
  verifyUserAttributes,
} from '../user'

describe('user', () => {
  const callback = () => null

  it('loadUserData', () => {
    const args = [callback]
    const result = loadUserData(...args)

    expect(result).toStrictEqual({
      fields: {
        types: {
          REQUEST: 'user/LOAD_DATA.REQUEST',
          SUCCESS: 'user/LOAD_DATA.SUCCESS',
          FAILURE: 'user/LOAD_DATA.FAILURE',
        },
        endpoint: '/user',
        preFormat: formatUserRequestParams,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('resendVerifyCode', () => {
    const args = ['attributeName', callback]
    const result = resendVerifyCode(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user/send-attrib-verification-code',
        types: {
          REQUEST: 'user/RESEND_VERIFY_CODE.REQUEST',
          SUCCESS: 'user/RESEND_VERIFY_CODE.SUCCESS',
          FAILURE: 'user/RESEND_VERIFY_CODE.FAILURE',
        },
        method: 'POST',
        query: {
          attributeName: 'attributeName',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('updateUserAttributes', () => {
    const args = [{ data: { data: 'data' }, callback }]
    const result = updateUserAttributes(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user',
        method: 'PUT',
        types: {
          REQUEST: 'user/UPDATE_ATTRIBUTES.REQUEST',
          SUCCESS: 'user/UPDATE_ATTRIBUTES.SUCCESS',
          FAILURE: 'user/UPDATE_ATTRIBUTES.FAILURE',
        },
        query: {
          data: 'data',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('verifyUserAttributes', () => {
    const args = [{ code: '1234', attributeName: 'email', callback }]
    const result = verifyUserAttributes(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user/verify-attribute',
        types: {
          REQUEST: 'user/VERIFY_ATTRIBUTES.REQUEST',
          SUCCESS: 'user/VERIFY_ATTRIBUTES.SUCCESS',
          FAILURE: 'user/VERIFY_ATTRIBUTES.FAILURE',
        },
        method: 'POST',
        query: {
          code: '1234',
          attributeName: 'email',
        },
        meta: {
          changedAttrKey: 'email_verified',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
