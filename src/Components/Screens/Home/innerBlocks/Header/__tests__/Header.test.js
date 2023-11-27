import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../Header'

describe('Home.Header', () => {
  const defaultProps = {
    screenTitle: 'screen title',
    userId: 'userId',
    avatar: 'avatar',
    isRequest: false,
    searchProps: {
      value: '',
      placeholder: 'placeholder',
      onChange: () => null,
    },
    onOpenSidebar: () => null,
    onAvatarClick: () => null,
    pts: 0,
    t: () => null,
    onPointsClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render avatar icon', () => {
    const props = {
      ...defaultProps,
      avatar: null,
    }

    const wrapper = shallow(<Component {...props} />)

    expect(wrapper.find(getTestID('avatarIcon')).length).toBe(1)
  })

  it('should render avatar loader', () => {
    const props = {
      ...defaultProps,
      isRequest: false,
    }

    const wrapper = shallow(<Component {...props} />)

    expect(wrapper.find(getTestID('avatarLoader')).length).toBe(0)

    wrapper.setProps({ isRequest: true })

    expect(wrapper.find(getTestID('avatarLoader')).length).toBe(1)

    wrapper.setProps({ isRequest: false })

    expect(wrapper.find(getTestID('avatarLoader')).length).toBe(0)
  })
})
