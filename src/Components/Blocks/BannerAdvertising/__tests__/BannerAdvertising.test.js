import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../BannerAdvertising'

describe('BannerAdvertising', () => {
  const defaultProps = {
    text: 'test',
    image: 'image',
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
