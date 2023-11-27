import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ProIcon as Component } from '../index'

describe('ProIcon', () => {
  it('render snapshot', () => {
    const wrapper = shallow(<Component isVisible />)
    const wrapper2 = shallow(<Component isVisible={false} />)

    expect([wrapper, wrapper2]).toMatchSnapshot()
  })
})
