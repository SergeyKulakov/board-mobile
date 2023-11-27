import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ScreenLoader as Component } from '../index'

describe('ScreenLoader', () => {
  const defaultProps = {
    visible: true,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
