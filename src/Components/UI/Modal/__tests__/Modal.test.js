import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Modal as Component } from '../index'

describe('Modal', () => {
  const defaultProps = {
    title: 'title',
    width: 400,
    visible: true,
    onConfirmPress: () => null,
    onCancelPress: () => null,
    style: undefined,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
