import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { SettingRow as Component } from '../index'

describe('SettingRow', () => {
  const defaultProps = {
    value: true,
    onChange: () => null,
    onClick: () => null,
    subTitle: 'subTitle',
    title: 'title',
    isDisabled: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
