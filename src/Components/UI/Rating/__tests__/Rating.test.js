import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Rating as Component } from '../index'

describe('Rating', () => {
  it('render snapshot', () => {
    const wrapper = shallow(<Component />)

    expect(wrapper).toMatchSnapshot()
  })
})
