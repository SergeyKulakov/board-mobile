import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../UserInfo'

describe('UserInfo', () => {
  const defaultProps = {
    avatarURL: undefined,
    distance: {
      length: 14,
      units: 'km',
    },
    family_name: 'family_name',
    given_name: 'given_name',
    idVerified: undefined,
    isPremium: false,
    isPro: true,
    jobsDoneCount: 4,
    rate: '4',
    reviewsCount: 2,
    t: text => text,
    username: 'userId',
    onCommentClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
