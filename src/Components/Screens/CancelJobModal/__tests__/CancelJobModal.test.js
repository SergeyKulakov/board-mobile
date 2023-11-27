import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../CancelJobModal'

describe('CancelJobModal', () => {
  const defaultProps = {
    navigate: {
      push: () => null,
      pop: () => null,
      hideModal: () => null,
    },
    onSubmit: () => null,
    t: () => 'text',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('submit action', () => {
    const props = {
      ...defaultProps,
      onSubmit: jest.fn(),
      navigate: {
        ...defaultProps.navigate,
        hideModal: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.setState({ reason: 'reason' })

    wrapper
      .find('Button')
      .props()
      .onClick()

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
    expect(props.onSubmit).toHaveBeenCalledWith('reason')
    expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
  })
})
