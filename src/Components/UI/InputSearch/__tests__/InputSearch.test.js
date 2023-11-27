import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { InputSearch as Component } from '../index'

describe('InputSearch', () => {
  const defaultProps = {
    value: '',
    placeholder: 'placeholder',
    disabled: false,
    onChange: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onSubmit: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
