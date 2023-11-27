import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ListItem'

describe('LanguagesModal.ListItem', () => {
  const defaultProps = {
    t: text => text,
    item: {
      type: 'en',
      flag: 'english',
      name: 'English',
    },
    onPressItem: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
