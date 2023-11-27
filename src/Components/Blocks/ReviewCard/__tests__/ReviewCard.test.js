import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ReviewCard'

describe('ReviewCard', () => {
  const defaultProps = {
    comment: '12',
    rate: 4,
    createdAt: '1571657077622',
    author: {
      avatarURL: 'avatarUrl',
      isPro: false,
      isVerified: true,
      isPremium: false,
      username: 'userId',
      stars: '3',
      services: new Array(3).fill({ title: 'title' }),
    },
    onDelete: () => null,
    onEdit: () => null,
    t: text => text,
    onOpenPopup: () => null,
    isOpenPopup: false,
    isPopupEnabled: true,
    onClosePopup: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
