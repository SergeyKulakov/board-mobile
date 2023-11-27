import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../index'

describe('ConfirmResetPassword.Form', () => {
  const defaultProps = {
    userName: 'username',
    loading: false,
    values: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    errors: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    touched: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    setFieldTouched: () => null,
    handleSubmit: () => null,
    handleChange: () => null,
    handleBlur: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('set field touched', () => {
    const props = {
      ...defaultProps,
      setFieldTouched: jest.fn(),
    }
    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find('InputBlock')
      .get(0)
      .props.onSetTouched()

    expect(props.setFieldTouched).toHaveBeenCalledTimes(1)
    expect(props.setFieldTouched).toHaveBeenLastCalledWith('code')

    wrapper
      .find('InputBlock')
      .get(1)
      .props.onSetTouched()

    expect(props.setFieldTouched).toHaveBeenCalledTimes(2)
    expect(props.setFieldTouched).toHaveBeenLastCalledWith('password')

    wrapper
      .find('InputBlock')
      .get(2)
      .props.onSetTouched()

    expect(props.setFieldTouched).toHaveBeenCalledTimes(3)
    expect(props.setFieldTouched).toHaveBeenLastCalledWith('confirmPassword')
  })
})
