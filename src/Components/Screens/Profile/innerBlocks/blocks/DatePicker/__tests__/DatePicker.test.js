import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { DatePicker as Component } from '../index'

describe('Profile.DatePicker', () => {
  const defaultProps = {
    text: 'text',
    value: 1570172606852,
    onChange: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    wrapper.setState({ maxData: 1570172606852 })

    expect(wrapper).toMatchSnapshot()
  })

  it('should update state when props was updated', () => {
    const props = {
      ...defaultProps,
      value: 1570172606852,
    }

    const wrapper = shallow(<Component {...props} />)

    expect(wrapper.state().date).toBe(props.value)

    const nextValue = 1570172606853
    wrapper.setProps({ value: nextValue })

    expect(wrapper.state().date).toBe(nextValue)
  })

  it('submit action', () => {
    const props = {
      ...defaultProps,
      onSelect: jest.fn(),
      value: 1570172606852,
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleCloseModal = jest.fn()

    expect(props.onSelect).not.toHaveBeenCalledTimes(1)

    wrapper
      .find(getTestID`modal`)
      .props()
      .onConfirmPress()

    expect(wrapper.instance().handleCloseModal).toHaveBeenCalledTimes(1)

    expect(props.onSelect).toHaveBeenCalledTimes(1)
    expect(props.onSelect).toHaveBeenCalledWith(props.value)
  })
})
