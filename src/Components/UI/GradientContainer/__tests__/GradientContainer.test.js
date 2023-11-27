import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { View } from 'react-native'

import { GradientContainer as Component } from '../index'

describe('GradientContainer', () => {
  const defaultProps = {
    children: <View />,
  }

  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
