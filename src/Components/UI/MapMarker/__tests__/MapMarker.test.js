import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { MapMarker as Component } from '../index'

describe('MapMarker', () => {
  const defaultProps = {
    center: '12.142423/31.321244',
    isActive: true,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
