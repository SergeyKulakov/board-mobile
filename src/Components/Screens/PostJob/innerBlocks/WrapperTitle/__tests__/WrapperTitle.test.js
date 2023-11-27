import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { WrapperTitle as Component } from '../index'

describe('PostJob.WrapperTitle', () => {
  const defaultProps = {
    isError: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps}>title</Component>)

    expect(wrapper).toMatchSnapshot()
  })
})
