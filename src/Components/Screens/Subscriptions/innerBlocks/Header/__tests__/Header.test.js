import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../index'

describe('Chats.Header', () => {
  const defaultProps = {
    onBackClick: () => null,
    onHamburgerClick: () => null,
    searchProps: {
      value: 'value',
      placeholder: 'placeholder',
      onChange: () => null,
    },
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
