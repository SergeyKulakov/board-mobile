import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Footer as Component } from '../index'

describe('Login.Footer', () => {
  const defaultProps = {
    onSignUpClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
