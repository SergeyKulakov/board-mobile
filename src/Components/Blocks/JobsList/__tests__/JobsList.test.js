import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../JobsList'
import config from '../config'

describe('JobsList', () => {
  const defaultProps = {
    data: [],
    isPaginationLoading: false,
    isRefreshing: () => null,
    loadingFavoriteId: false,
    onApplyClick: () => null,
    onFavoriteClick: () => null,
    onLoadMoreVacancies: () => null,
    onRefresh: () => null,
    onRemoveVacancy: () => null,
    onShareVacancyClick: () => null,
    onVacancyClick: () => null,
    orientation: 'orientation',
    renderItem: undefined,
    user: {
      username: 'userId',
    },
    extraData: [],
    onShowAd: () => null,
    isAdsLoading: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderHiddenItems = wrapper.instance().renderHiddenItems({
      item: {
        _id: 'jobId',
        favouriteId: 'favouriteId',
        author: 'author',
      },
    })

    const renderHeaderComponent = wrapper.instance().renderHeaderComponent()

    const renderRow = wrapper.instance().renderRow(
      {
        item: {
          _id: 'jobId',
          author: 'userId',
        },
      },
      'rowMap',
    )

    const renderListAds = wrapper.instance().renderRow(
      {
        item: 'ads',
      },
      'rowMap',
    )

    expect([
      wrapper,
      renderHiddenItems,
      renderHeaderComponent,
      renderRow,
      renderListAds,
    ]).toMatchSnapshot()
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
      onRemoveVacancy: jest.fn(),
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

    const jobsRef = {
      '41er23r21f1': { animate: getAnimate() },
      '41er212312d': { animate: getAnimate() },
      '41ee1123sss': { animate: getAnimate() },
    }

    wrapper.instance().jobs = jobsRef

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
      config.SwipeListView.leftOpenValue,
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

    expect(jobsRef['41er23r21f1'].animate).toHaveBeenCalledTimes(1)
    expect(jobsRef['41er212312d'].animate).not.toHaveBeenCalled()
    expect(jobsRef['41ee1123sss'].animate).not.toHaveBeenCalled()

    expect(props.onRemoveVacancy).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(props.onRemoveVacancy).toHaveBeenCalledTimes(1)
      expect(props.onRemoveVacancy).toHaveBeenCalledWith({ _id: '41er23r21f1' })
      done()
    }, 1100)
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

  it('vacancy click action', () => {
    const props = {
      ...defaultProps,
      onVacancyClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onVacancyClick).not.toHaveBeenCalled()

    wrapper.instance().openedItemId = '2314ewqdsa'

    const args = [
      {
        item: {
          _id: '2314ewqdsa',
        },
      },
      {
        '2314ewqdsa': {
          closeRow: jest.fn(),
        },
      },
    ]

    wrapper.instance().handleVacancyClick(...args)

    expect(props.onVacancyClick).not.toHaveBeenCalled()
    expect(args[1]['2314ewqdsa'].closeRow).toHaveBeenCalledTimes(1)

    wrapper.instance().openedItemId = null

    wrapper.instance().handleVacancyClick(...args)

    expect(props.onVacancyClick).toHaveBeenCalledTimes(1)
    expect(args[1]['2314ewqdsa'].closeRow).toHaveBeenCalledTimes(1)
  })

  it('call load more action', () => {
    const props = {
      ...defaultProps,
      onLoadMoreVacancies: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().isScrollToTop = true

    expect(props.onLoadMoreVacancies).not.toHaveBeenCalled()

    const args = {
      distanceFromEnd: 0,
    }

    wrapper.instance().handleLoadMore(args)

    expect(props.onLoadMoreVacancies).not.toHaveBeenCalled()

    wrapper.instance().isScrollToTop = false

    wrapper.instance().handleLoadMore(args)

    expect(props.onLoadMoreVacancies).not.toHaveBeenCalled()

    const args2 = {
      distanceFromEnd: 1,
    }

    wrapper.instance().handleLoadMore(args2)

    expect(props.onLoadMoreVacancies).toHaveBeenCalledTimes(1)
  })
})
