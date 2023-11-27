import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { RequestsSPList as Component } from '../index'

describe('RequestsSPList', () => {
  const defaultProps = {
    data: [],
    isRefreshing: false,
    onRefresh: () => null,
    onImagesModalOpen: () => null,
    loadSPId: null,
    onClickCard: () => null,
    onShareClick: () => null,
    onOpenReviews: () => null,
    onHireClick: () => null,
    onShowAd: () => null,
    isAdsLoading: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const renderBanner = wrapper.instance().renderBanner()
    const renderCard = wrapper.instance().renderCard({
      item: {
        doer: {
          username: 'doerId',
          picsOfWork: [],
        },
        distance: 'distance',
        pics: [],
      },
    })

    expect([wrapper, renderBanner, renderCard]).toMatchSnapshot()
  })

  it('key extractor', () => {
    const props = {
      ...defaultProps,
      value: 'value',
    }
    const wrapper = shallow(<Component {...props} />)

    const result = wrapper
      .find('FlatList')
      .props()
      .keyExtractor({ _id: 'itemId' })

    expect(result).toBe('itemId')
  })
})
