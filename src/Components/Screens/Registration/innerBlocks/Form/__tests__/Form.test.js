import React from 'react'
import { shallow } from 'enzyme'
import { expect as chai } from 'chai'

import 'jest-styled-components'

import { Form as Component } from '../index'

describe('Registration.Form', () => {
  const defaultProps = {
    values: {},
    errors: {},
    touched: {},
    handleChange: () => null,
    isLoading: false,
    handleBlur: () => null,
    setFieldValue: () => null,
    handleSubmit: () => null,
    setFieldTouched: () => null,
    toast: () => null,
    onOpenPhoneModal: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call action onSetTouched', () => {
    const props = {
      ...defaultProps,
      setFieldTouched: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.setFieldTouched).not.toHaveBeenCalled()
    const { length } = wrapper.find('InputBlock')

    chai(length).to.be.equal(5)

    for (let i = 0; i < length; i++) {
      wrapper
        .find('InputBlock')
        .get(i)
        .props.onSetTouched()
    }

    expect(props.setFieldTouched).toHaveBeenCalledTimes(5)
  })

  describe('call LicenseAgreement actions', () => {
    it('onChange', () => {
      const props = {
        ...defaultProps,
        values: {
          ...defaultProps.values,
          isAgree: false,
        },
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.setFieldValue).not.toHaveBeenCalled()

      chai(wrapper.find('LicenseAgreement')).to.lengthOf(1)
      wrapper
        .find('LicenseAgreement')
        .props()
        .onChange()

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith(
        'isAgree',
        !props.values.isAgree,
      )
    })

    it('onSuccess', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.setFieldValue).not.toHaveBeenCalled()

      wrapper
        .find('LicenseAgreement')
        .props()
        .onSuccess()

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('isAgree', true)
    })
  })
})
