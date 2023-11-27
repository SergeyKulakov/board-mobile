import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { TabNavigationElement as Component } from '../index'

describe('TabNavigationElement', () => {
  const defaultProps = {
    isActive: false,
    isLoading: false,
    onClick: () => null,
    title: 'title',
    style: undefined,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const witLoading = shallow(<Component {...defaultProps} isLoading />)

    expect([wrapper, witLoading]).toMatchSnapshot()
  })
})
