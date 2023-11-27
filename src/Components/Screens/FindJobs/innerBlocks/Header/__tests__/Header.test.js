import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../Header'

describe('FindJobs.Header', () => {
  const defaultProps = {
    text: {
      title: 'title',
    },
    isMapDataLoading: false,
    activeScreenId: 0,
    onClickBack: () => null,
    onClickHamburger: () => null,
    onClickFilter: () => null,
    onClickNavItem: () => null,
    onClickSort: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('select tab', () => {
    const props = {
      ...defaultProps,
      onClickNavItem: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const { length } = wrapper.find('TabNavigationElement')

    for (let i = 0; i < length; i++) {
      wrapper
        .find('TabNavigationElement')
        .get(i)
        .props.onClick()
    }

    expect(props.onClickNavItem).toHaveBeenCalledTimes(2)
  })
})
