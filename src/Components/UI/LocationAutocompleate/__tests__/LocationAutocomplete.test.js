import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { LocationAutocomplete as Component } from '../index'

describe('LocationAutocomplete', () => {
  const defaultProps = {
    label: 'label',
    placeholder: 'placeholder',
    value: '',
    onClick: () => null,
    isError: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
