import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../EmptyList'

describe('EmptyList', () => {
  const defaultProps = {
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps}>text</Component>)

    expect(wrapper).toMatchSnapshot()
  })
})
