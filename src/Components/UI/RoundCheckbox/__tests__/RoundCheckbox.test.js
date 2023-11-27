import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { RoundCheckbox as Component } from '../index'

describe('RoundCheckbox', () => {
  const defaultProps = {
    isActive: true,
    disabled: false,
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
