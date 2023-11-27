import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../index'

describe('TrackMap', () => {
  const defaultProps = {
    initialRegion: {
      lat: 13.32124,
      lon: 31.32143
    }
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
