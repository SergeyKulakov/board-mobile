import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ChatCard as Component } from '../index'

describe('ChatCard', () => {
  const defaultProps = {
    messages: [],
    partner: {
      avatarURL: 'avatarURL',
      username: 'userId',
      given_name: 'given_name',
      family_name: 'family_nam',
    },
    isLoading: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
