import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../DoerInfo'

describe('DoerInfo', () => {
  const defaultProps = {
    onLoadSP: () => null,
    profile: {
      given_name: 'given_name',
      family_name: 'family_name',
      username: 'profileId',
    },
    t: text => text,
    doerId: 'doerId',
    onClick: () => null,
    onReviewsClick: () => null,
    onClickReport: () => null,
    user: {
      given_name: 'given_name',
      family_name: 'family_name',
      username: 'userId',
    },
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('load sp profile', done => {
    const props = {
      ...defaultProps,
      onLoadSP: jest.fn((doerId, callback) => {
        setTimeout(callback, 1000)
      }),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(wrapper.state('isRequest')).toBe(true)
    expect(props.onLoadSP).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(wrapper.state('isRequest')).toBe(false)

      done()
    }, 1100)
  })
})
