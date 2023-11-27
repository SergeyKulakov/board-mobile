import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { VideoPlayer as Component } from '../index'

describe('VideoPlayer', () => {
  const defaultProps = {
    previewURL: 'previewURL',
    videoURL: 'videoURL',
    navigation: {
      addListener: () => Promise.resolve(),
    },
    isMobileDataForVideo: true,
    audioUrl: 'audioUrl',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('set error', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper
      .find(getTestID('VideoPlayer'))
      .props()
      .onError({
        error: {
          code: -11800,
        },
      })

    expect(wrapper.state('error')).toBe('Could not load video from URL')

    wrapper
      .find(getTestID('VideoPlayer'))
      .props()
      .onError({
        error: {
          code: 'other error code',
        },
      })

    expect(wrapper.state('error')).toBe(
      'An error has occurred playing this video',
    )
  })

  it('call handleMainButtonTouch method', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.setState({ progress: 0 })

    wrapper.instance().player = { seek: jest.fn() }

    wrapper.instance().track = { seek: jest.fn() }

    wrapper
      .find(getTestID('pausedButton'))
      .props()
      .onPress()

    expect(wrapper.instance().player.seek).not.toHaveBeenCalled()
    expect(wrapper.instance().track.seek).not.toHaveBeenCalled()
    expect(wrapper.state('paused')).toBe(false)

    wrapper.setState({ progress: 2, paused: true })

    wrapper
      .find(getTestID('pausedButton'))
      .props()
      .onPress()

    expect(wrapper.instance().player.seek).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().track.seek).toHaveBeenCalledTimes(1)
    expect(wrapper.state('paused')).toBe(false)
  })

  it('call handleProgressPress method', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.setState({ duration: 2 })

    wrapper.instance().player = { seek: jest.fn() }

    wrapper.instance().track = { seek: jest.fn() }

    wrapper
      .find(getTestID('progressButton'))
      .props()
      .onPress({
        nativeEvent: {
          locationX: 100,
        },
      })

    expect(wrapper.instance().player.seek).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().player.seek).toHaveBeenCalledWith(0.8)
    expect(wrapper.instance().track.seek).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().track.seek).toHaveBeenCalledWith(0.8)
  })

  it('call handleProgress method', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.setState({ duration: 2 })

    wrapper
      .find(getTestID('VideoPlayer'))
      .props()
      .onProgress({ currentTime: 12 })

    expect(wrapper.state('progress')).toBe(6)
  })
})
