import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../PuckButton'

describe('PuckButton', () => {
  const defaultProps = {
    onClick: () => null,
    style: {},
    textStyle: {},
    outline: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
