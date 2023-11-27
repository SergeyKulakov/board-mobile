import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ServicesWrapRow'

describe('ServicesWrapRow', () => {
  const defaultProps = {
    data: [
      {
        _id: 0,
        title: 'title',
      },
    ],
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const wrapper2 = shallow(<Component {...defaultProps} data={[]} />)

    expect([wrapper, wrapper2]).toMatchSnapshot()
  })
})
