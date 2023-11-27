import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Report as Component } from '../index'

describe('Report', () => {
  const defaultProps = {
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
