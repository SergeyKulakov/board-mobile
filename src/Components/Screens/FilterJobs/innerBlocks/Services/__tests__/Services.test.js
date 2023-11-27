import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Services as Component } from '../index'

describe('FilterJobs.Services', () => {
  const defaultProps = {
    text: {
      getCategoryTitle: text => text,
      popular: 'popular',
      all: 'all',
    },
    data: [],
    popularData: [],
    onItemClick: () => null,
    activeItems: [],
    isSelectedAll: false,
    onSelectAll: () => null,
    filterProps: {
      value: '',
      onChange: () => null,
      label: 'label',
      placeholder: 'placeholder',
      animatedLine: true,
    },
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
