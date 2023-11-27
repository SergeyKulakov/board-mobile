import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ServicesList'

describe('ServicesList', () => {
  const defaultProps = {
    horizontal: false,
    data: [],
    withShadowBox: false,
    orientation: 'LANDSCAPE',
    changedItemId: undefined,
    numColumns: undefined,
    activeItemId: undefined,
    disabledItems: undefined,
    activeItems: undefined,
    title: 'title',
    isSelectedAll: false,
    onClickItem: () => null,
    getServiceTitle: text => text,
    onSelectAll: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const withShadowBoxWrapper = shallow(
      <Component {...defaultProps} withShadowBox />,
    )

    const args = {
      item: {
        categoryId: '23',
        _id: '123',
        isActive: false,
        title: 'title',
        iconName: 'iconName',
      },
    }

    const renderItemWrapper = wrapper
      .find('FlatList')
      .props()
      .renderItem(args)

    expect([wrapper, withShadowBoxWrapper, renderItemWrapper]).toMatchSnapshot()
  })
})
