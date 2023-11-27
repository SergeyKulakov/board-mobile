import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { DatePicker as Component } from '../index'

describe('DatePicker', () => {
  const defaultProps = {
    date: 1571646573465,
    mode: 'time',
    maximumDate: 1571646573465,
    minimumDate: 1571646573465,
    text: {
      cancel: 'cancel',
      confirm: 'confirm',
    },
    visible: true,
    onSubmit: () => null,
    onCancel: () => null,
    onChange: () => null,
    locale: 'en',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call submit action', () => {
    const props = {
      ...defaultProps,
      onSubmit: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.setState({ date: 1571646674250 })

    wrapper
      .find('Modal')
      .props()
      .onConfirmPress()

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
    expect(props.onSubmit).toHaveBeenCalledWith(1571646674250)
  })

  it('call change action', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('Picker'))
      .props()
      .onDateChange(1571646761815)

    expect(props.onChange).toHaveBeenCalledTimes(1)
    expect(props.onChange).toHaveBeenCalledWith(1571646761815)
    expect(wrapper.state('date')).toBe(1571646761815)
  })
})
