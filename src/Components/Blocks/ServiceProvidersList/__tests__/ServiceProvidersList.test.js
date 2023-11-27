import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ServiceProvidersList'

describe('ServiceProvidersList', () => {
  const defaultProps = {
    data: [],
    isRefreshing: false,
    isPaginationLoading: false,
    favouriteLoadingId: null,
    orientation: 'orientation',
    renderItem: () => null,
    onImageClick: () => null,
    onFavouriteClick: () => null,
    onShareClick: () => null,
    onHireClick: () => null,
    onLoadMore: () => null,
    onRefresh: () => null,
    onRemoveServiceProviderClick: () => null,
    onProfileClick: () => null,
    onOpenReviews: () => null,
    onShowAd: () => null,
    isAdsLoading: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderRow = wrapper.instance().renderRow(
      {
        item: {
          _id: '123wqwe',
          username: '123wqwe',
          picsOfWork: [],
        },
      },
      'rowMap',
    )

    const renderAds = wrapper.instance().renderRow(
      {
        item: 'ads',
      },
      'rowMap',
    )

    const renderHiddenItems = wrapper
      .instance()
      .renderHiddenItems({ item: { _id: '123wqeq' } })

    expect([wrapper, renderRow, renderAds, renderHiddenItems]).toMatchSnapshot()
  })

  it('close row', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().openedItemId = 1000

    wrapper
      .find('SwipeListView')
      .props()
      .onRowClose()

    expect(wrapper.instance().openedItemId).toBeNull()
  })

  it('remove card', done => {
    const props = {
      ...defaultProps,
      onRemoveServiceProviderClick: jest.fn(),
      data: [],
    }
    const getAnimate = () =>
      jest.fn(
        () =>
          new Promise(resolve => {
            setTimeout(resolve, 1000)
          }),
      )

    const wrapper = shallow(<Component {...props} />)

    const hiddenActionsRef = {
      '41er23r21f1': { animate: getAnimate() },
      '41er212312d': { animate: getAnimate() },
      '41ee1123sss': { animate: getAnimate() },
    }

    wrapper.instance().hiddenActions = hiddenActionsRef

    const itemsRef = {
      '41er23r21f1': { animate: getAnimate() },
      '41er212312d': { animate: getAnimate() },
      '41ee1123sss': { animate: getAnimate() },
    }

    wrapper.instance().items = itemsRef

    wrapper.instance().removedItemId = '41er23r21f1'

    const args = [
      '41er23r21f1',
      {
        '41er23r21f1': {
          closeRow: jest.fn(),
          props: { item: { _id: '41er23r21f1' } },
        },
        '41er212312d': {
          closeRow: jest.fn(),
          props: { item: { _id: '41er212312d' } },
        },
        '41ee1123sss': {
          closeRow: jest.fn(),
          props: { item: { _id: '41ee1123sss' } },
        },
      },
    ]

    wrapper
      .find('SwipeListView')
      .props()
      .onRowOpen(...args)

    expect(args[1]['41er23r21f1'].closeRow).toHaveBeenCalledTimes(1)
    expect(args[1]['41er212312d'].closeRow).not.toHaveBeenCalled()
    expect(args[1]['41ee1123sss'].closeRow).not.toHaveBeenCalled()

    expect(hiddenActionsRef['41er23r21f1'].animate).toHaveBeenCalledTimes(1)
    expect(hiddenActionsRef['41er212312d'].animate).not.toHaveBeenCalled()
    expect(hiddenActionsRef['41ee1123sss'].animate).not.toHaveBeenCalled()

    expect(itemsRef['41er23r21f1'].animate).toHaveBeenCalledTimes(1)
    expect(itemsRef['41er212312d'].animate).not.toHaveBeenCalled()
    expect(itemsRef['41ee1123sss'].animate).not.toHaveBeenCalled()

    expect(props.onRemoveServiceProviderClick).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(props.onRemoveServiceProviderClick).toHaveBeenCalledTimes(1)
      expect(props.onRemoveServiceProviderClick).toHaveBeenCalledWith({
        _id: '41er23r21f1',
      })
      done()
    }, 1100)
  })

  it('call load more action', () => {
    const props = {
      ...defaultProps,
      onLoadMore: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().isScrollToTop = true

    expect(props.onLoadMore).not.toHaveBeenCalled()

    wrapper.instance().handleLoadMore({
      distanceFromEnd: 0,
    })

    expect(props.onLoadMore).not.toHaveBeenCalled()

    wrapper.instance().isScrollToTop = false

    wrapper.instance().handleLoadMore({
      distanceFromEnd: 0,
    })

    expect(props.onLoadMore).not.toHaveBeenCalled()

    wrapper.instance().handleLoadMore({
      distanceFromEnd: 1,
    })

    expect(props.onLoadMore).toHaveBeenCalledTimes(1)
  })

  describe('click on puck', () => {
    it('with opened puck', () => {
      const props = {
        ...defaultProps,
        onProfileClick: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().openedItemId = '1234qwer'

      const args = [
        { item: { _id: '1234qwer' } },
        {
          '1234qwer': {
            closeRow: jest.fn(),
          },
        },
      ]

      wrapper.instance().handleProfileClick(...args)

      expect(args[1]['1234qwer'].closeRow).toHaveBeenCalledTimes(1)
      expect(props.onProfileClick).not.toHaveBeenCalled()
    })

    it('without opened puck', () => {
      const props = {
        ...defaultProps,
        onProfileClick: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = [
        { item: { _id: '1234qwer' } },
        {
          '1234qwer': {
            closeRow: jest.fn(),
          },
        },
      ]

      wrapper.instance().handleProfileClick(...args)

      expect(args[1]['1234qwer'].closeRow).not.toHaveBeenCalled()
      expect(props.onProfileClick).toHaveBeenCalledTimes(1)
      expect(props.onProfileClick).toHaveBeenCalledWith(args[0].item)
    })
  })

  it('set remove item id', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.instance().removedItemId).toBeNull()

    wrapper
      .find('SwipeListView')
      .props()
      .onSwipeValueChange({
        isOpen: true,
        key: '41er23r21f1',
        value: 150,
      })

    expect(wrapper.instance().removedItemId).toBe('41er23r21f1')

    wrapper
      .find('SwipeListView')
      .props()
      .onSwipeValueChange({
        isOpen: false,
        key: '41er23r21f1',
        value: 130,
      })

    expect(wrapper.instance().removedItemId).toBe('41er23r21f1')

    wrapper
      .find('SwipeListView')
      .props()
      .onSwipeValueChange({
        isOpen: false,
        key: '41er23r21f1',
        value: 160,
      })

    expect(wrapper.instance().removedItemId).toBeNull()
  })
})
