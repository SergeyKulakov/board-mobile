import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { CategoryBlock as Component } from '../index'

describe('PostJob.CategoryBlock', () => {
  const defaultProps = {
    title: 'title',
    subTitle: 'subTitle',
    isError: false,
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
