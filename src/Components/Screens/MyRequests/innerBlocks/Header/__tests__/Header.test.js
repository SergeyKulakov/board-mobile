import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('MyRequests.Header', () => {
  const defaultProps = {
    activeTabId: 0,
    onBackClick: () => null,
    onClickTab: () => null,
    onHamburgerClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
