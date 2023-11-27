import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ProviderPhoto as Component } from '../index'

describe('ProviderPhoto', () => {
  const defaultProps = {
    avatarURL: 'avatarURL',
    username: 'userId',
    isCheck: false,
    style: undefined,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const withCheck = shallow(<Component {...defaultProps} isCheck />)

    expect([wrapper, withCheck]).toMatchSnapshot()
  })
})
