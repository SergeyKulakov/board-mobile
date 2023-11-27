import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../SliderAdvertising'

describe('SliderAdvertising', () => {
  const defaultProps = {
    orientation: 'orientation',
    data: undefined,
    extraData: [],
    onClick: () => null,
    t: text => text,
    type: 'ads',
    onShowAd: () => null,
    isLoading: false,
  }

  it('render snapshots', () => {
    const defaultWrapper = shallow(<Component {...defaultProps} />)

    const sponsorWrapperProps = {
      ...defaultProps,
      type: 'sponsor',
    }
    const sponsorWrapper = shallow(<Component {...sponsorWrapperProps} />)

    const renderItemWrapper = sponsorWrapper
      .find(getTestID('SnapCarousel'))
      .props()
      .renderItem({
        item: {
          image: 'image',
          title: 'title',
          buttonText: 'buttonText',
        },
      })

    expect([
      defaultWrapper,
      sponsorWrapper,
      renderItemWrapper,
    ]).toMatchSnapshot()
  })
})
