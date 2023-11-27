import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ScrollBlock as Component } from '../index'

describe('OnBoarding.ScrollBlock', () => {
  const defaultProps = {
    activeScreen: 1,
    onChangeScrollNavigation: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
