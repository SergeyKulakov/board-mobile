import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ShadowBox as Component } from '../index'

describe('ShadowBox', () => {
  const defaultProps = {
    title: 'title',
    style: {},
    textStyle: {},
  }

  it('render snapshots', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const titleWrapper = shallow(<Component.Title />)

    expect([wrapper, titleWrapper]).toMatchSnapshot()
  })
})
