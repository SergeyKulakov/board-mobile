import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ServicesAutocomplete'

describe('ServicesAutocomplete', () => {
  const defaultProps = {
    value: '',
    categories: [],
    onSelect: () => null,
    toast: () => null,
    onLoadCategories: () => null,
    t: text => text,
    getError: () => null,
    activeLanguage: 'en',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const renderItem = wrapper.instance().renderItem({
      item: {
        iconName: 'iconName',
        title: 'title',
      },
    })

    const wrapperWithValue = shallow(<Component {...defaultProps} value="1" />)

    expect([wrapper, wrapperWithValue, renderItem]).toMatchSnapshot()
  })

  describe('load services', () => {
    const getProps = isSuccessful => ({
      ...defaultProps,
      onLoadCategories: jest.fn(({ callback }) => {
        setTimeout(() => {
          callback({
            error: isSuccessful ? undefined : { payload: { code: 'code' } },
          })
        }, 1000)
      }),
      toast: jest.fn(),
      getError: jest.fn(),
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.toast).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onLoadCategories).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.toast).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()

        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.toast).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onLoadCategories).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)

        done()
      }, 1100)
    })
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
