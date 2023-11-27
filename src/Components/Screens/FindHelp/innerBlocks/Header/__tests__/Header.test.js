import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('FindHelp.EmptyScreen', () => {
  const defaultProps = {
    text: {
      title: 'title',
      getTabTitle: key => key,
    },
    activeScreenId: 0,
    onClickSearch: () => null,
    onClickBack: () => null,
    onClickHamburger: () => null,
    onClickFilter: () => null,
    onClickNavItem: () => null,
    onClickSort: () => null,
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
