import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { Container, Block } from '../style'
import { Header as Component } from '../index'

describe('ConfirmResetPassword.Header', () => {
  const defaultProps = {
    title: 'title',
    onBackClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render components', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find(Container)).to.be.lengthOf(1)
    chaiExpect(wrapper.find(Block)).to.be.lengthOf(1)
  })

  it('call back action', () => {
    const props = {
      ...defaultProps,
      onBackClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onBackClick).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('backButton'))
      .props()
      .onClick()

    expect(props.onBackClick).toHaveBeenCalledTimes(1)
  })
})
