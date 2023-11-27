import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { UploadImages as Component } from '../index'

describe('UploadImages', () => {
  const defaultProps = {
    userId: 'userID',
    type: 'type',
    title: 'title',
    subTitle: 'subTitle',
    jobImagesMode: 'jobImagesMode',
    data: [],
    onAdd: () => null,
    onDelete: () => null,
    toast: () => null,
    onClickImage: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const renderItem = wrapper
      .instance()
      .renderItem({ item: { id: 'id', image: 'image' }, index: 0 })

    const renderHeaderComponent = wrapper.instance().renderHeaderComponent()

    expect([wrapper, renderItem, renderHeaderComponent]).toMatchSnapshot()
  })

  describe('call handleResponse method', () => {
    it('successful', () => {
      const props = {
        ...defaultProps,
        toast: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().handleResponse({})

      expect(props.toast).not.toHaveBeenCalled()
    })

    describe('failure', () => {
      it('camera error', () => {
        const props = {
          ...defaultProps,
          toast: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper.instance().handleResponse({
          error: 'Camera permissions not granted',
        })

        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          'Camera permissions not granted',
        )
      })

      it('photo library error', () => {
        const props = {
          ...defaultProps,
          toast: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper.instance().handleResponse({
          error: 'Photo library permissions not granted',
        })

        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          'Photo library permissions not granted',
        )
      })
    })
  })

  it('click on image method', () => {
    const props = {
      ...defaultProps,
      onClickImage: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleItemClick('123')

    expect(props.onClickImage).toHaveBeenCalledTimes(1)
    expect(props.onClickImage).toHaveBeenCalledWith('123')
  })

  it('key extractor', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const result = wrapper
      .find('FlatList')
      .props()
      .keyExtractor({ id: 'itemId' })

    expect(result).toBe('itemId')
  })
})
