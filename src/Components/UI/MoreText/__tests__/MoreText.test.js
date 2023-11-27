import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { MoreText as Component } from '../index'

describe('MoreText', () => {
  const defaultProps = {
    style: {},
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps}>Test text</Component>)

    expect(wrapper).toMatchSnapshot()
  })
})
