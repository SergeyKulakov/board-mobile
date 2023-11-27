import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../EmptyScreen'

describe('FindHelp.EmptyScreen', () => {
  const defaultProps = {
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
