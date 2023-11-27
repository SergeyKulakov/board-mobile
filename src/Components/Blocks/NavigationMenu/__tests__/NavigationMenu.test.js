import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../NavigationMenu'

describe('NavigationMenu', () => {
  const defaultProps = {
    activeLanguage: 'en',
    t: text => text,
    notifications: [
      {
        read: false,
      },
    ],
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should call push method', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().handlePush = jest.fn()

    const { length } = wrapper.find(getTestID('section'))

    for (let i = 0; i < length; i++) {
      wrapper
        .find(getTestID('section'))
        .get(i)
        .props.onPress()
    }

    expect(wrapper.instance().handlePush).toHaveBeenCalledTimes(12)
  })
})
