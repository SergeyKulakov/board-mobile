import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ChatMessage as Component } from '../index'

describe('ChatMessage', () => {
  const defaultProps = {
    author: 'author',
    avatarUrl: 'userAvatarURL',
    createAt: 1571646253116,
    isMyMessage: false,
    text: 'text',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
