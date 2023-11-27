import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { VideoLinks as Component } from '../index'

describe('PostJob.VideoLinks', () => {
  const defaultProps = {
    title: 'title',
    data: [],
    toast: () => null,
    onAdd: () => null,
    onDelete: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
