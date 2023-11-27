import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('Chat.Header', () => {
  const defaultProps = {
    onBackClick: () => null,
    user: {
      given_name: 'given_name',
      family_name: 'family_name',
      isPremium: false,
      username: 'username',
    },
    onHamburgerClick: () => null,
    onLockUserClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
