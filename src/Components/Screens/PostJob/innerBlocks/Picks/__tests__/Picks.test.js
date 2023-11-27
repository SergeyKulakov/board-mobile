import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Picks as Component } from '../index'

describe('PostJob.Picks', () => {
  const defaultProps = {
    title: 'title',
    data: [],
    toast: () => null,
    onAddImage: () => null,
    onDeleteImage: () => null,
    onClickImage: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
