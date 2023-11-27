import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { DragCardAction as Component } from '../index'

describe('DragCardAction', () => {
  const defaultProps = {
    isReject: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be render with default', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find(getTestID('acceptIcon'))).to.be.lengthOf(1)
  })

  it('should be render with isReject', () => {
    const props = {
      ...defaultProps,
      isReject: true,
    }
    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find(getTestID('rejectIcon'))).to.be.lengthOf(1)
  })
})
