import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { SmallService as Component } from '../index'

describe('SmallService', () => {
  const defaultProps = {
    image: 'image',
    onClick: () => null,
    title: 'title',
    style: undefined,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
