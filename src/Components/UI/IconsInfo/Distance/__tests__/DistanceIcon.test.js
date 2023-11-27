import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { DistanceIcon as Component } from '../index'

describe('DistanceIcon', () => {
  const defaultProps = {
    value: 12,
    style: {},
    textStyle: {},
    icon: {
      name: 'user',
      size: 20,
      color: '#fff',
    },
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
