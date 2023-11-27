import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { PeopleList as Component } from '../index'

describe('PeopleList', () => {
  const defaultProps = {
    text: {},
    userObjKey: 'userObjKey',
    data: [],
    onClickHeaderLink: () => null,
    onClickItem: () => null,
  }

  it('render snapshots', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderItemProps = {
      item: {
        idVerified: false,
      },
    }
    const renderItemWrapper = wrapper.instance().renderItem(renderItemProps)

    expect([wrapper, renderItemWrapper]).toMatchSnapshot()
  })

  it('should save "View All" Button height', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.state().buttonWidth).toBe(100)

    const args = {
      nativeEvent: {
        layout: {
          width: 10000,
        },
      },
    }

    wrapper
      .find(getTestID('viewAllButton'))
      .props()
      .onLayout(args)

    expect(wrapper.state().buttonWidth).toBe(args.nativeEvent.layout.width)
  })

  it('should return valid key', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(
      wrapper
        .find(getTestID('peopleList'))
        .props()
        .keyExtractor({
          title: 'title',
        }),
    ).toBe('title')

    expect(
      wrapper
        .find(getTestID('peopleList'))
        .props()
        .keyExtractor({
          username: 'username',
          title: 'title',
        }),
    ).toBe('username')

    expect(
      wrapper
        .find(getTestID('peopleList'))
        .props()
        .keyExtractor({
          username: 'username',
          title: 'title',
          _id: '123',
        }),
    ).toBe('123')
  })
})
