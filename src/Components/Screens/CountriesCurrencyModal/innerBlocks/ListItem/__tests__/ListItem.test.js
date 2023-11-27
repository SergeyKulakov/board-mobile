import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'
import { ListItem as Component } from '../index'

describe('CountriesCurrencyModal.ListItem', () => {
  const defaultProps = {
    name: 'country',
    code: 'code',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
