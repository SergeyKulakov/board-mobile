import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../MapWrapper'

describe('MapWrapper', () => {
  const defaultProps = {
    title: 'title',
    imageProps: undefined,
    lat: '13.321421',
    lon: '23.412342',
    titleStyle: undefined,
    onMapClick: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
