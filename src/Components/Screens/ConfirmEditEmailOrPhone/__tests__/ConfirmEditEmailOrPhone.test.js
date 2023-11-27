import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../ConfirmEditEmailOrPhone'

describe('ConfirmEditEmailOrPhone', () => {
  const defaultProps = {
    navigate: {
      hideModal: () => null,
      showMessage: () => null,
    },
    onSendConfirmCode: () => null,
    onResendConfirmCode: () => null,
    attributeName: 'email',
    userName: 'username',
    onSuccess: () => null,
    onCancel: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderForm = wrapper.instance().renderForm({
      values: {},
      touched: {},
      errors: {},
      handleChange: () => null,
      handleSubmit: () => null,
      handleBlur: () => null,
    })

    expect([wrapper, renderForm]).toMatchSnapshot()
  })

  it('should render formik', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find('Formik')).to.be.lengthOf(1)
  })

  it('back action', () => {
    const props = {
      ...defaultProps,
      navigate: {
        hideModal: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)
    expect(props.navigate.hideModal).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('backIcon'))
      .props()
      .onClick()

    expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
  })

  it('should be call onCancel when click back icon and onCancel function to be', () => {
    const props = {
      ...defaultProps,
      onCancel: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onCancel).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('backIcon'))
      .props()
      .onClick()

    expect(props.onCancel).toHaveBeenCalledTimes(1)
  })

  it('call onResendConfirmCode', () => {
    const props = {
      ...defaultProps,
      onResendConfirmCode: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onResendConfirmCode).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('resetButton'))
      .props()
      .onClick()

    expect(props.onResendConfirmCode).toHaveBeenCalledTimes(1)
  })

  describe('call onSendConfirmCode', () => {
    const delay = 100
    const code = '123456'
    const errorObg = {
      error: {
        payload: {
          message: 'message',
        },
      },
    }

    const getProps = isSuccess => ({
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        showMessage: jest.fn(),
      },
      onSendConfirmCode: jest.fn(({ callback }) => {
        setTimeout(() => {
          callback(isSuccess ? {} : errorObg)
        }, delay)
      }),
      onSuccess: jest.fn(),
    })

    it('success', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      expect(props.onSendConfirmCode).not.toHaveBeenCalled()

      chaiExpect(wrapper.state('loading')).to.equal(false)

      wrapper.instance().handleSendCode({ code })

      chaiExpect(wrapper.state('loading')).to.equal(true)
      expect(props.onSendConfirmCode).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.onSuccess).toHaveBeenCalledTimes(1)
        done()
      }, delay + 10)
    })

    it('error', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      expect(props.onSendConfirmCode).not.toHaveBeenCalled()

      chaiExpect(wrapper.state('loading')).to.equal(false)

      wrapper.instance().handleSendCode({ code })

      chaiExpect(wrapper.state('loading')).to.equal(true)
      expect(props.onSendConfirmCode).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.onSuccess).not.toHaveBeenCalled()
        expect(props.navigate.showMessage).toHaveBeenCalledTimes(1)
        expect(props.navigate.showMessage).toHaveBeenCalledWith(
          errorObg.error.payload.message,
        )
        done()
      }, delay + 10)
    })
  })

  describe('call resend icon', () => {
    const serverError = {
      payload: {
        code: 'code',
      },
    }
    const getProps = isSuccessful => ({
      ...defaultProps,
      onResendConfirmCode: jest.fn((attribute, callback) => {
        setTimeout(() => {
          callback({
            error: isSuccessful ? undefined : serverError,
          })
        }, 1000)
      }),
      attributeName: 'email',
      onShowPuck: jest.fn(),
      getError: jest.fn(),
    })

    it('not call by default', () => {
      const props = getProps(true)

      shallow(<Component {...props} />)

      expect(props.onResendConfirmCode).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find(getTestID('resetButton'))
        .props()
        .onClick()

      expect(wrapper.state('isResetCodeRequest')).toBe(true)

      expect(props.onResendConfirmCode).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('isResetCodeRequest')).toBe(false)
        expect(props.onResendConfirmCode).toHaveBeenCalledTimes(1)
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).not.toHaveBeenCalled()
        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find(getTestID('resetButton'))
        .props()
        .onClick()

      expect(wrapper.state('isResetCodeRequest')).toBe(true)

      expect(props.onResendConfirmCode).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('isResetCodeRequest')).toBe(false)
        expect(props.onResendConfirmCode).toHaveBeenCalledTimes(1)
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        done()
      }, 1100)
    })
  })
})
