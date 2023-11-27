import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { Image as Component } from '../index'

describe('Image', () => {
  const defaultProps = {
    data: 'image',
    withLoading: true,
    loaderStyle: {},
    resizeMode: undefined,
    onLoadStart: () => null,
    onLoadEnd: () => null,
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call onLoadEnd', done => {
    const props = {
      ...defaultProps,
      onLoadEnd: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('imageWrapper'))
      .props()
      .onLoadEnd()

    expect(wrapper.state('loading')).toBe(false)

    setTimeout(() => {
      expect(props.onLoadEnd).toHaveBeenCalledTimes(1)
      done()
    }, 100)
  })

  it('call onLoadStart', done => {
    const props = {
      ...defaultProps,
      onLoadStart: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('imageWrapper'))
      .props()
      .onLoadStart()

    expect(wrapper.state('loading')).toBe(false)

    setTimeout(() => {
      expect(props.onLoadStart).toHaveBeenCalledTimes(1)
      done()
    }, 100)
  })
})
