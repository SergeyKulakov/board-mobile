import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ShareIcon as Component } from '../index'

describe('ShareIcon', () => {
  it('render snapshot', () => {
    const wrapper = shallow(<Component />)

    expect(wrapper).toMatchSnapshot()
  })
})
