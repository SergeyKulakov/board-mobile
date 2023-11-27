import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { View } from 'react-native'

import { Button as Component } from '../index'

describe('Button', () => {
  const defaultProps = {
    linear: undefined,
    disabled: false,
    type: undefined,
    AfterIcon: undefined,
    BeforeIcon: undefined,
    text: 'text',
    loading: false,
    style: undefined,
    visible: true,
    textStyle: {},
    onClick: () => null,
    onLongPress: () => null,
    fieldStyle: undefined,
    gradientStyle: undefined,
    children: undefined,
    onLayout: () => null,
  }

  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be render text props', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(
      wrapper
        .find('[testID="renderText"]')
        .children()
        .text(),
    ).to.be.equal(defaultProps.text)

    const nextProps = {
      ...defaultProps,
      text: 'next text',
    }

    wrapper.setProps({ ...nextProps })

    chaiExpect(
      wrapper
        .find('[testID="renderText"]')
        .children()
        .text(),
    ).to.be.equal(nextProps.text)
  })

  it('should be render before icon', () => {
    const props = {
      ...defaultProps,
      BeforeIcon: <View />,
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="icon"]')).to.have.lengthOf(1)
  })

  it('should be render after icon', () => {
    const props = {
      ...defaultProps,
      AfterIcon: <View />,
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="icon"]')).to.have.lengthOf(1)
  })

  it('should be render default button', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find('[testID="gradientContainer"]')).to.be.lengthOf(1)
    chaiExpect(wrapper.find('[testID="renderText"]')).to.be.lengthOf(1)
    chaiExpect(wrapper.find('[testID="icon"]')).to.be.lengthOf(0)
  })

  it('should be render colored button', () => {
    const props = {
      ...defaultProps,
      linear: true,
      style: {
        bgColor: '#fff',
      },
      type: 'color',
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="coloredContainer"]')).to.have.lengthOf(1)
    chaiExpect(
      wrapper.find('[testID="coloredContainer"]').props().bgColor,
    ).to.be.equal(props.style.bgColor)
  })

  it('should not be render touchible field when loading', () => {
    const props = {
      ...defaultProps,
      loading: false,
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('TouchableOpacity')).to.have.lengthOf(1)

    wrapper.setProps({ loading: true })

    chaiExpect(wrapper.find('TouchableOpacity')).to.have.lengthOf(0)
  })

  it('should be render loading component', () => {
    const props = {
      ...defaultProps,
      loading: false,
    }

    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find('[testID="loader"]')).to.have.lengthOf(0)

    wrapper.setProps({ loading: true })

    chaiExpect(wrapper.find('[testID="loader"]')).to.have.lengthOf(1)
  })

  it('should be call onClick', () => {
    const props = {
      ...defaultProps,
      onClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onClick).not.toHaveBeenCalled()

    wrapper
      .find('TouchableOpacity')
      .props()
      .onPress()

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('should be render disabled', () => {
    const props = {
      ...defaultProps,
      disabled: true,
      style: {
        disabledGradient: {
          start: '#fff',
          end: '#000',
        },
      },
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('TouchableOpacity')).to.have.lengthOf(0)
    chaiExpect(
      wrapper.find('[testID="gradientContainer"]').props().gradient,
    ).to.be.equal(props.style.disabledGradient)
  })

  it('should be render null when invalid prop type', () => {
    const props = {
      ...defaultProps,
      type: null,
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="gradientContainer"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="coloredContainer"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="loader"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="renderText"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="icon"]')).to.have.lengthOf(0)
  })

  it('should be return Fragment when visible === false', () => {
    const props = {
      ...defaultProps,
      visible: false,
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('Fragment')).to.have.lengthOf(1)

    chaiExpect(wrapper.find('[testID="gradientContainer"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="coloredContainer"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="loader"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="renderText"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="icon"]')).to.have.lengthOf(0)
  })
})
