import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { CheckRow as Component } from '../index'

describe('CheckRow', () => {
  const defaultProps = {
    text: 'text',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
