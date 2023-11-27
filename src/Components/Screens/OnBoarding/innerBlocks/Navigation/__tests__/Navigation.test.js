import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Navigation as Component } from '../index'

describe('OnBoarding.Navigation', () => {
  const defaultProps = {
    activeScreen: 1,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
