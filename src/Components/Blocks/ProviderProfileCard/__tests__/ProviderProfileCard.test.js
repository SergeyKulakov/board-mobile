import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ProviderProfileCard'

describe('ProviderProfileCard', () => {
  const defaultProps = {
    activeScreenName: 'activeScreenName',
    data: {
      services: [],
      favouriteId: undefined,
      picsOfWork: [],
      about: 'about',
    },
    text: {
      jobsMore: 'jobsMore',
      hireNow: 'hireNow',
      more: 'more',
    },
    user: {
      username: 'userId',
    },
    orientation: 'LANDSCAPE',
    isFavouriteLoading: false,
    getPicture: () => null,
    onImageClick: () => null,
    onFavouriteClick: () => null,
    onShareClick: () => null,
    onHireClick: () => null,
    onClick: () => null,
    onCommentClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
