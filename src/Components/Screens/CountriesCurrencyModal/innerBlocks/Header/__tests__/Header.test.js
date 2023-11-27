import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'
import { Header as Component } from '../index'

describe('CountriesCurrencyModal.Header', () => {
  const defaultProps = {
    searchProps: {
      value: 'value',
      disabled: false,
      onChange: () => null,
      placeholder: '',
      onFocus: () => null,
      onBlur: () => null,
    },
    onClickBack: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('should be change isSearchShow state field', () => {
    it('should be false', () => {
      const wrapper = shallow(<Component {...defaultProps} />)
      chaiExpect(wrapper.state('isSearchShow')).to.equal(false)
    })

    it('should be true', () => {
      const wrapper = shallow(<Component {...defaultProps} />)
      wrapper
        .find('Icon')
        .props()
        .onClick()

      chaiExpect(wrapper.state('isSearchShow')).to.equal(true)
    })

    it('should be false', () => {
      const wrapper = shallow(<Component {...defaultProps} />)
      wrapper
        .find('Icon')
        .props()
        .onClick()

      wrapper
        .find('Icon')
        .props()
        .onClick()

      chaiExpect(wrapper.state('isSearchShow')).to.equal(false)
    })
  })
})
