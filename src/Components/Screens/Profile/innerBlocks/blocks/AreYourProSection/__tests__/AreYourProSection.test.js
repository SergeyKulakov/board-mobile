import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { AreYourProSection as Component } from '../index'

describe('Profile.AreYourProSection', () => {
  const defaultProps = {
    text: 'text',
    value: false,
    onChange: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
