import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { SocialButton as Component } from '../index'

describe('SocialButton', () => {
  const defaultProps = {
    icon: 'icon',
    color: '#fff',
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
