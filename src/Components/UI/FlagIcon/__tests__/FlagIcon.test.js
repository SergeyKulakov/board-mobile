import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { FlagIcon as Component } from '../index'

describe('FlagIcon', () => {
  const defaultProps = {
    fileName: 'test',
  }

  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be render Image', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find('Image')).to.have.lengthOf(1)
  })
})
