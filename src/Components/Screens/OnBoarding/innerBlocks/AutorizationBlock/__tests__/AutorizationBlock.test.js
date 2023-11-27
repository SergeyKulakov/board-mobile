import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { AutorizationBlock as Component } from '../index'

describe('OnBoarding.AutorizationBlock', () => {
  it('render snapshot', () => {
    const wrapper = shallow(<Component />)

    expect(wrapper).toMatchSnapshot()
  })
})
