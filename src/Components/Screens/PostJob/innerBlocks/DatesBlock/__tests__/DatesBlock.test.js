import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { DatesBlock as Component } from '../index'

describe('PostJob.DatesBlock', () => {
  const defaultProps = {
    text: {
      title: 'title',
      doneBefore: 'doneBefore',
      expDate: 'expDate',
      getError: 'getError',
    },
    values: {
      doneBefore: 1570540025729,
      expiryDate: 1570540025729,
    },
    errors: {
      doneBefore: 'doneBefore',
      expiryDate: 'expiryDate',
    },
    touched: {
      doneBefore: false,
      expiryDate: false,
    },
    onSetBeforeDate: () => null,
    onSetExpiryDate: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    wrapper.setState({ minDate: 1570540025729 })

    expect(wrapper).toMatchSnapshot()
  })

  it('should set done before date', () => {
    const props = {
      ...defaultProps,
      onSetBeforeDate: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const date = 1570540025739

    wrapper
      .find(getTestID('doneBeforeDate'))
      .props()
      .onSubmit(date)

    expect(props.onSetBeforeDate).toHaveBeenCalledTimes(1)
    expect(props.onSetBeforeDate).toHaveBeenCalledWith(date)
    expect(wrapper.state().showModalId).toBe(null)
  })

  it('should set expiry date', () => {
    const props = {
      ...defaultProps,
      onSetExpiryDate: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const date = 1570540025739

    wrapper
      .find(getTestID('expiryDate'))
      .props()
      .onSubmit(date)

    expect(props.onSetExpiryDate).toHaveBeenCalledTimes(1)
    expect(props.onSetExpiryDate).toHaveBeenCalledWith(date)
    expect(wrapper.state().showModalId).toBe(null)
  })
})
