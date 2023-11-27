import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { InputModal as Component } from '../index'

describe('InputModal', () => {
  const defaultProps = {
    title: 'title',
    visible: true,
    value: '',
    modalWidth: 300,
    onChange: () => null,
    onBlur: () => null,
    onSubmit: () => null,
    onCancel: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
