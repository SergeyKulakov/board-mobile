import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../ChangePasswordModal'

describe('ChangePasswordModal', () => {
  const defaultProps = {
    t: text => text,
    isVisible: true,
    onClose: () => null,
    onForgotPasswordClick: () => null,
    onSubmit: () => null,
    onShowPuck: () => null,
    getError: () => 'error text',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call fargot password action', () => {
    const props = {
      ...defaultProps,
      onForgotPasswordClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('forgotPassTouchableField'))
      .props()
      .onPress()

    expect(props.onForgotPasswordClick).toHaveBeenCalledTimes(1)
  })

  it('call close method', () => {
    const props = {
      ...defaultProps,
      onClose: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleClose()

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })

  it('call verify method', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.state('currentPassword')).toBe('')
    expect(wrapper.state('isError')).toBe(false)

    wrapper.instance().handleVerify()

    expect(wrapper.state('isError')).toBe(true)
    expect(wrapper.state('isRootScreen')).toBe(true)

    wrapper.setState({ currentPassword: '1234' })

    wrapper.instance().handleVerify()

    expect(wrapper.state('isError')).toBe(true)
    expect(wrapper.state('isRootScreen')).toBe(false)
  })

  it('change password', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper
      .find(getTestID('changeInput'))
      .props()
      .onChange('1')

    expect(wrapper.state('currentPassword')).toBe('1')
    expect(wrapper.state('isError')).toBe(false)
  })

  describe('call submit method', () => {
    const getProps = isSuccessful => ({
      ...defaultProps,
      onClose: jest.fn(),
      onSubmit: jest.fn((pass, newPass, callback) => {
        setTimeout(() => {
          callback({
            error: isSuccessful
              ? undefined
              : {
                  payload: {
                    code: 'error code',
                  },
                },
          })
        }, 1000)
      }),
      getError: jest.fn(),
      onShowPuck: jest.fn(),
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      const currentPassword = '1234Qqwer'
      const newPassword = '3214sdqW'

      wrapper.setState({ currentPassword, newPassword })

      wrapper.instance().handleSubmit()

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      setTimeout(() => {
        expect(props.onClose).toHaveBeenCalledTimes(1)
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        expect(wrapper.state('isRequest')).toBe(false)
        expect(wrapper.state('currentPassword')).toBe('')
        expect(wrapper.state('newPassword')).toBe('')
        expect(wrapper.state('isRootScreen')).toBe(true)

        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      const currentPassword = '1234Qqwer'
      const newPassword = '3214sdqW'

      wrapper.setState({ currentPassword, newPassword })

      wrapper.instance().handleSubmit()

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.onClose).not.toHaveBeenCalled()

        done()
      }, 1100)
    })
  })
})
