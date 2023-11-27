import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { SlashBlock as Component } from '../index'

describe('OnBoarding.SlashBlock', () => {
  const defaultProps = {
    image: 0,
    title: 'title',
    subTitle: 'sub title',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
