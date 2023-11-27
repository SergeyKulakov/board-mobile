import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { RemoveCardAction as Component } from '../index'

describe('RemoveCardAction', () => {
  it('render snapshot', () => {
    const wrapper = shallow(<Component />)

    expect(wrapper).toMatchSnapshot()
  })
})
