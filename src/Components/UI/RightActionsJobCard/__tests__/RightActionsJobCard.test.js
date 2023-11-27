import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { RightActionsJobCard as Component } from '../index'

describe('RightActionsJobCard', () => {
  const defaultProps = {
    loading: false,
    isActiveFavorite: false,
    isFavouriteCallable: true,
    onShareClick: () => null,
    onFavoriteClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
