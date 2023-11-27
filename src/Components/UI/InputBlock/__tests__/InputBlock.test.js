import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { InputBlock as Component } from '../index'

describe('InputBlock', () => {
  const defaultProps = {
    value: '',
    label: 'label',
    numberMode: false,
    errorMessage: 'errorMessage',
    errorStatus: 'errorStatus',
    disabled: false,
    autoHeight: false,
    placeholder: 'placeholder',
    animatedLabel: false,
    animatedLine: false,
    isSecure: false,
    onChange: () => null,
    onBlur: () => null,
    onFocus: () => null,
    onEndEditing: () => null,
    onSetTouched: () => null,
    onOpenPhoneModal: () => null,
    multiline: false,
  }

  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('call input callbacks', () => {
    it('blur', () => {
      const props = {
        ...defaultProps,
        onBlur: jest.fn(),
        onSetTouched: jest.fn(),
        animatedLine: true,
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().animate = jest.fn()

      expect(props.onBlur).not.toHaveBeenCalled()

      wrapper
        .find(getTestID('input'))
        .props()
        .onBlur()

      expect(wrapper.instance().animate).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().animate).toHaveBeenCalledWith(0)

      expect(props.onBlur).toHaveBeenCalledTimes(1)
      expect(props.onSetTouched).toHaveBeenCalledTimes(1)
    })

    it('focus', () => {
      const props = {
        ...defaultProps,
        onFocus: jest.fn(),
        animatedLine: true,
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onFocus).not.toHaveBeenCalled()

      wrapper.instance().animate = jest.fn()

      wrapper
        .find(getTestID`input`)
        .props()
        .onFocus()

      expect(wrapper.instance().animate).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().animate).toHaveBeenCalledWith(1)
      expect(props.onFocus).toHaveBeenCalledTimes(1)
    })
  })

  describe('animate by default', () => {
    it('with value', () => {
      const props = {
        ...defaultProps,
        value: 'ewqr',
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().animate = jest.fn()

      wrapper.instance().componentDidMount()

      expect(wrapper.instance().animate).toHaveBeenCalledTimes(1)
    })

    it('without value', () => {
      const props = {
        ...defaultProps,
        value: '',
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().animate = jest.fn()

      wrapper.instance().componentDidMount()

      expect(wrapper.instance().animate).not.toHaveBeenCalled()
    })
  })

  describe('open phone modal', () => {
    it("shouldn't render phone button", () => {
      const props = {
        ...defaultProps,
        onOpenPhoneModal: undefined,
      }

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.find(getTestID`FlagIconContainer`).length).toBe(0)
    })

    it('should render phone button', () => {
      const props = {
        ...defaultProps,
        onOpenPhoneModal: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onOpenPhoneModal).not.toHaveBeenCalled()

      expect(wrapper.find(getTestID`FlagIconContainer`).length).toBe(1)
      wrapper
        .find(getTestID`FlagIconContainer`)
        .props()
        .onPress()

      expect(props.onOpenPhoneModal).toHaveBeenCalledTimes(1)
    })
  })

  it('change input change height', () => {
    const props = {
      ...defaultProps,
      autoHeight: true,
    }

    const wrapper = shallow(<Component {...props} />)

    expect(wrapper.state().inputHeight).toBe(40)

    const args = {
      nativeEvent: {
        contentSize: { height: 300 },
      },
    }

    wrapper
      .find(getTestID('input'))
      .props()
      .onContentSizeChange(args)

    expect(wrapper.state().inputHeight).toBe(300)

    const args2 = {
      nativeEvent: {
        contentSize: { height: 500 },
      },
    }

    wrapper
      .find(getTestID('input'))
      .props()
      .onContentSizeChange(args2)

    expect(wrapper.state().inputHeight).toBe(500)
  })
})
