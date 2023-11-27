import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ModalButton as Component } from '../index'

describe('ModalButton', () => {
  const defaultProps = {
    text: 'text',
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
