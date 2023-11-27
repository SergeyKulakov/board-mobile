import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Wrapper as Component } from '../index'

describe('Home.Wrapper', () => {
  const defaultProps = {
    title: 'title',
    onClickShowAll: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
