import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ReviewProfile'

describe('ReviewProfile', () => {
  const defaultProps = {
    avatar: 'avatar',
    userId: 'userId',
    userName: 'username',
    rate: 3,
    reviewsCount: '4',
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
