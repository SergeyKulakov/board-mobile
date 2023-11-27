import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { formatUserRequestParams } from 'Helpers/user'

export const GET_USER = createAsyncAction('user/LOAD_DATA')
export const loadUserData = callback =>
  apiCall({
    types: GET_USER,
    endpoint: '/user',
    preFormat: formatUserRequestParams,
    callback,
  })

export const UPDATE_USER_ATTRIBUTES = createAsyncAction(
  'user/UPDATE_ATTRIBUTES',
)
export const updateUserAttributes = ({ data, callback }) =>
apiCall({
    endpoint: '/user',
    method: 'PUT',
    types: UPDATE_USER_ATTRIBUTES,
    query: data,
    callback,
  })

export const VERIFY_USER_ATTRIBUTES = createAsyncAction(
  'user/VERIFY_ATTRIBUTES',
)
export const verifyUserAttributes = ({ code, attributeName, callback }) =>
  apiCall({
    endpoint: '/user/verify-attribute',
    types: VERIFY_USER_ATTRIBUTES,
    method: 'POST',
    query: {
      code,
      attributeName,
    },
    meta: {
      changedAttrKey:
        attributeName === 'email' ? 'email_verified' : 'phone_number_verified',
    },
    callback,
  })

export const RESEND_VERIFY_CODE = createAsyncAction('user/RESEND_VERIFY_CODE')
export const resendVerifyCode = (attributeName, callback) =>
  apiCall({
    endpoint: '/user/send-attrib-verification-code',
    types: RESEND_VERIFY_CODE,
    method: 'POST',
    query: {
      attributeName,
    },
    callback,
  })
