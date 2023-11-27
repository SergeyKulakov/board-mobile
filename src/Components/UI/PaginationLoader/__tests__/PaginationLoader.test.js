import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { PaginationLoader as Component } from '../index'

describe('PaginationLoader', () => {
  const defaultProps = {
    visible: true,
    containerStyle: {},
    size: 15,
    color: '#fff',
  }

  it('render snapshots', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const wrapper2 = shallow(<Component {...defaultProps} visible={false} />)

    expect([wrapper, wrapper2]).toMatchSnapshot()
  })
})
