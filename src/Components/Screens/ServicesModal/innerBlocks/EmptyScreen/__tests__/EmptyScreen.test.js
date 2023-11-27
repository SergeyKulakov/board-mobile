import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { EmptyScreen } from '../index'

describe('ServicesModal.EmptyScreen', () => {
  const defaultProps = {
    value: '',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<EmptyScreen {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  // it('render props.value', () => {
  //   const wrapper = shallow(<Component {...defaultProps} />)
  //
  //   console.debug(wrapper.find('[testID="text"]').children)
  //   chaiExpect(wrapper.find('[testID="text"]').children).to.be.equal('server error')
  //
  //   const nextValue = 'test'
  //   wrapper.setProps({ value: nextValue })
  //
  //   chaiExpect(wrapper.find('[testID="text"]').children).to.be.equal(`${nextValue} not found`)
  // })
  //
  // it('should be icon search', () => {
  //   const wrapper = mount(<Component {...defaultProps} />)
  //
  //
  // })
})
