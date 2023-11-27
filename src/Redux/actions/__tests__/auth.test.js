import {
  setSkipTutorial,
  auth,
  confirmResetPassword,
  federatedSignIn,
  forgotPass,
  refreshTokens,
  resendCode,
  sendConfirmCode,
  signIn,
  signOut,
  signOutApp,
  signUp,
} from '../auth'

describe('actions/auth', () => {
  const callback = () => null

  it('setSkipTutorial', () => {
    const result = setSkipTutorial()

    expect(result).toStrictEqual({
      type: 'auth/SET_TUTORIAL_SKIP',
    })
  })

  it('auth', () => {
    const result = auth()

    expect(result).toStrictEqual({
      type: 'auth/FEDERATION_SIGN_IN.REQUEST',
    })
  })

  it('confirmResetPassword', () => {
    const args = [
      { userName: 'userId', password: '1234qwer', confirmationCode: '1234321' },
      callback,
    ]
    const result = confirmResetPassword(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/forgot-password/confirm',
        types: {
          REQUEST: 'auth/CONFIRM_RESET_PASSWORD.REQUEST',
          SUCCESS: 'auth/CONFIRM_RESET_PASSWORD.SUCCESS',
          FAILURE: 'auth/CONFIRM_RESET_PASSWORD.FAILURE',
        },
        method: 'POST',
        query: {
          username: 'userId',
          password: '1234qwer',
          confirmationCode: '1234321',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('federatedSignIn', () => {
    const args = [{ url: 'url', callback }]
    const result = federatedSignIn(...args)

    expect(result).toStrictEqual({
      type: 'auth/FEDERATED_SIGN_IN',
      url: 'url',
      callback,
    })
  })

  it('forgotPass', () => {
    const args = [{ value: 'userName', callback }]
    const result = forgotPass(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/forgot-password',
        types: {
          REQUEST: 'auth/FORGOT_PASS.REQUEST',
          SUCCESS: 'auth/FORGOT_PASS.SUCCESS',
          FAILURE: 'auth/FORGOT_PASS.FAILURE',
        },
        method: 'POST',
        query: {
          username: 'userName',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('refreshTokens', () => {
    const args = ['refreshToken', callback]
    const result = refreshTokens(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/update-creds',
        types: {
          REQUEST: 'auth/REFRESH_TOKENS.REQUEST',
          SUCCESS: 'auth/REFRESH_TOKENS.SUCCESS',
          FAILURE: 'auth/REFRESH_TOKENS.FAILURE',
        },
        auth: 'refreshToken',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('resendCode', () => {
    const args = ['userId', callback]
    const result = resendCode(...args)

    expect(result).toStrictEqual({
      fields: {
        method: 'post',
        endpoint: '/auth/signup/confirm-code-resend',
        query: {
          username: 'userId',
        },
        types: {
          REQUEST: 'auth/RESEND_CODE.REQUEST',
          SUCCESS: 'auth/RESEND_CODE.SUCCESS',
          FAILURE: 'auth/RESEND_CODE.FAILURE',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('sendConfirmCode', () => {
    const args = ['code', 'userId', callback]
    const result = sendConfirmCode(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/signup/confirm',
        types: {
          REQUEST: 'auth/SEND_CONFIRM_CODE.REQUEST',
          SUCCESS: 'auth/SEND_CONFIRM_CODE.SUCCESS',
          FAILURE: 'auth/SEND_CONFIRM_CODE.FAILURE',
        },
        method: 'POST',
        query: {
          verificationCode: 'code',
          username: 'userId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('signIn', () => {
    const args = [
      { email: 'email', password: 'password', isRemember: true, callback },
    ]
    const result = signIn(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/signin',
        types: {
          REQUEST: 'auth/SIGN_IN.REQUEST',
          SUCCESS: 'auth/SIGN_IN.SUCCESS',
          FAILURE: 'auth/SIGN_IN.FAILURE',
        },
        method: 'POST',
        query: {
          username: 'email',
          password: 'password',
        },
        meta: {
          isRemember: true,
          userName: 'email',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('signOut', () => {
    const result = signOut()

    expect(result).toStrictEqual({
      type: 'auth/SIGN_OUT.REQUEST',
    })
  })

  it('signOutApp', () => {
    const result = signOutApp()

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/logout',
        types: {
          REQUEST: 'auth/SIGN_OUT_APP.REQUEST',
          SUCCESS: 'auth/SIGN_OUT_APP.SUCCESS',
          FAILURE: 'auth/SIGN_OUT_APP.FAILURE',
        },
      },
      type: 'API_CALL',
    })
  })

  it('signUp', () => {
    const args = [
      {
        userName: 'username',
        password: 'password',
        email: 'email',
        phoneNumber: '+389654738234',
        callback,
      },
    ]
    const result = signUp(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/auth/signup',
        types: {
          REQUEST: 'auth/SIGN_UP.REQUEST',
          SUCCESS: 'auth/SIGN_UP.SUCCESS',
          FAILURE: 'auth/SIGN_UP.FAILURE',
        },
        method: 'POST',
        query: {
          username: 'username',
          password: 'password',
          email: 'email',
          phoneNumber: '+389654738234',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
