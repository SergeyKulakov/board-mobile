import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../index'

describe('CancelJobModal.Header', () => {
  const defaultProps = {
    onBackClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
