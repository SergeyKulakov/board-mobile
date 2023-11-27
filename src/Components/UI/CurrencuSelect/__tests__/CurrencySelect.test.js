import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { CurrencySelect as Component } from '../index'

describe('CurrencySelect', () => {
  const defaultProps = {
    onClick: () => null,
    value: 'text',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
