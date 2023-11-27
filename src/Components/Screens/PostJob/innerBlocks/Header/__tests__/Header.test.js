import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('PostJob.Header', () => {
  const defaultProps = {
    title: 'title',
    onHamburgerClick: () => null,
    onBackClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
