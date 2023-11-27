import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { MoreIcon as Component } from '../index'

describe('MoreIcon', () => {
  const defaultProps = {
    color: '#fff',
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
