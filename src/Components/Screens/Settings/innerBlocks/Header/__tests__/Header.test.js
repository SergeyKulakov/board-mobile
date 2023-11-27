import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('Settings.Header', () => {
  const defaultProps = {
    onBackClick: () => null,
    onHamburgerClick: () => null,
    searchProps: {
      value: 'value',
      placeholder: 'placeholder',
      onChange: () => null,
    },
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
