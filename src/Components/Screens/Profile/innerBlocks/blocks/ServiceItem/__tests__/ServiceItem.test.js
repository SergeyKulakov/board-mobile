import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ServiceItem as Component } from '../index'

describe('Profile.ServiceItem', () => {
  const defaultProps = {
    text: {
      getCategoryTitle: text => text,
    },
    categoryTitle: 'categoryTitle',
    isOpenDialog: false,
    isLastItem: false,
    title: 'title',
    status: false,
    onEdit: () => null,
    onDelete: () => null,
    onOpenDialog: () => null,
    onCloseDialog: () => null,
    onChangeStatus: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
