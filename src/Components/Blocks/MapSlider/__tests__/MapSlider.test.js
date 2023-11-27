import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { MapSlider as Component } from '../index'

describe('MapSlider', () => {
  const defaultProps = {
    data: [],
    renderItem: () => null,
    extraData: [],
    onChangeIndex: () => null,
    onCreateRef: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
