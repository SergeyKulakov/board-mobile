import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ProviderSwitch as Component } from '../index'

describe('Profile.ProviderSwitch', () => {
  const defaultProps = {
    text: {},
    value: false,
    onSwitchClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
