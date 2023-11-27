import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../PickerRootScreen'

describe('PickerRootScreen', () => {
  const defaultProps = {
    date: 'date',
    hour: 'hour',
    minute: 'minute',
    onClickDate: () => null,
    onClickHour: () => null,
    onClickMinute: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
