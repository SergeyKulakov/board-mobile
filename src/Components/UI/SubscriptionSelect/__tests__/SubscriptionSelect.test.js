import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { SubscriptionSelect as Component } from '../index'

describe('SubscriptionSelect', () => {
  const defaultProps = {
    min: 5,
    value: 2,
    onDecrement: () => null,
    onIncrement: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
