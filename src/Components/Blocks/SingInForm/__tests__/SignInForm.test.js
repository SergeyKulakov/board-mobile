import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'

import 'jest-styled-components'

import Component from '../SingInForm'

describe('Login.SignInForm', () => {
  const defaultProps = {
    errors: {},
    handleBlur: () => null,
    handleChange: () => null,
    isLoading: false,
    onForgotClick: () => null,
    onSignIn: () => null,
    handleSubmit: () => null,
    setFieldTouched: () => null,
    setFieldValue: () => null,
    t: text => text,
    touched: {},
    values: {},
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('call actions', () => {
    it('call onChange action', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      chai.expect(wrapper.find('InputBlock')).to.lengthOf(2)

      expect(props.setFieldValue).not.toHaveBeenCalled()

      const args = 'test'

      wrapper
        .find('InputBlock')
        .get(0)
        .props.onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('email', args)
    })

    it('call onSetTouched', () => {
      const props = {
        ...defaultProps,
        setFieldTouched: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.setFieldTouched).not.toHaveBeenCalled()

      const { length } = wrapper.find('InputBlock')
      for (let i = 0; i < length; i++) {
        wrapper.find('InputBlock').get(i)

        wrapper
          .find('InputBlock')
          .get(i)
          .props.onSetTouched()
      }

      expect(props.setFieldTouched).toHaveBeenCalledTimes(2)
    })
  })
})
