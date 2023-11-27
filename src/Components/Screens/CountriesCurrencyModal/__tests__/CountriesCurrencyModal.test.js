import React from 'react'
import { shallow } from 'enzyme'
import { expect as chai } from 'chai'

import 'jest-styled-components'
import Component from '../CountriesCurrencyModal'

describe('CountriesCurrencyModal', () => {
  const defaultProps = {
    onSubmit: () => null,
    onCancel: () => null,
    navigate: {
      hideModal: () => null,
    },
    activeCode: '',
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('call back button action', () => {
    it('with onCancel prop', () => {
      const props = {
        ...defaultProps,
        navigate: {
          hideModal: jest.fn(),
        },
        onCancel: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.hideModal).not.toHaveBeenCalled()
      expect(props.onCancel).not.toHaveBeenCalled()

      wrapper
        .find('Header')
        .props()
        .onClickBack()

      expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
      expect(props.onCancel).toHaveBeenCalledTimes(1)
    })
    it('with out onCancel prop', () => {
      const props = {
        ...defaultProps,
        navigate: {
          hideModal: jest.fn(),
        },
        onCancel: undefined,
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.hideModal).not.toHaveBeenCalled()

      wrapper
        .find('Header')
        .props()
        .onClickBack()

      expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
    })
  })

  it('select element', () => {
    const selectedValue = {
      country: 'country',
      currency: 'currency',
      code: 'code',
    }
    const props = {
      ...defaultProps,
      onSubmit: jest.fn(),
      navigate: {
        ...defaultProps.navigate,
        hideModal: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onSubmit).not.toHaveBeenCalled()
    expect(props.navigate.hideModal).not.toHaveBeenCalled()

    wrapper.instance().handleSelect(selectedValue)

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
    expect(props.onSubmit).toHaveBeenCalledWith(selectedValue)
    expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
  })

  it('change search', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const text = 'text'

    chai(wrapper.state('value')).to.equal('')

    wrapper.instance().handleSearchChange(text)

    chai(wrapper.state('value')).to.equal(text)
  })
})
