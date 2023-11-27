import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { Icon as Component } from '../index'

describe('Icon', () => {
  const defaultProps = {
    name: 'user',
    size: undefined,
    color: undefined,
    visible: undefined,
    type: undefined,
    onClick: undefined,
  }

  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be render default icon', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find('[testID="faIcon"]')).to.have.lengthOf(1)
    chaiExpect(wrapper.find('[testID="miIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="mciIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="touchableField"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="faIcon"]').props().size).to.be.equal(20)
  })

  it('should be render default icon', () => {
    const props = {
      ...defaultProps,
      type: 'fa',
      size: 30,
      color: '#666',
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="faIcon"]')).to.have.lengthOf(1)
    chaiExpect(wrapper.find('[testID="miIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="mciIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="touchableField"]')).to.have.lengthOf(0)

    chaiExpect(wrapper.find('[testID="faIcon"]').props().name).to.be.equal(
      defaultProps.name,
    )
    chaiExpect(wrapper.find('[testID="faIcon"]').props().size).to.be.equal(
      props.size,
    )
    chaiExpect(wrapper.find('[testID="faIcon"]').props().color).to.be.equal(
      props.color,
    )
  })

  it('should be render ant icon', () => {
    const props = {
      ...defaultProps,
      type: 'ant',
      name: 'stepforward',
      size: 10,
      color: '#fff',
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="antIcon"]')).to.have.lengthOf(1)
    chaiExpect(wrapper.find('[testID="faIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="miIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="mciIcon"]')).to.have.lengthOf(0)

    chaiExpect(wrapper.find('[testID="antIcon"]').props().name).to.be.equal(
      props.name,
    )
    chaiExpect(wrapper.find('[testID="antIcon"]').props().size).to.be.equal(
      props.size,
    )
    chaiExpect(wrapper.find('[testID="antIcon"]').props().color).to.be.equal(
      props.color,
    )
  })

  it('should be render mci icon', () => {
    const props = {
      ...defaultProps,
      type: 'mci',
      name: 'account',
      size: 15,
      color: '#000',
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="mciIcon"]')).to.have.lengthOf(1)
    chaiExpect(wrapper.find('[testID="faIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="miIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="antIcon"]')).to.have.lengthOf(0)

    chaiExpect(wrapper.find('[testID="mciIcon"]').props().name).to.be.equal(
      props.name,
    )
    chaiExpect(wrapper.find('[testID="mciIcon"]').props().size).to.be.equal(
      props.size,
    )
    chaiExpect(wrapper.find('[testID="mciIcon"]').props().color).to.be.equal(
      props.color,
    )
  })

  it('should be render mi icon', () => {
    const props = {
      ...defaultProps,
      type: 'mi',
      name: 'access-alarm',
      size: 15,
      color: '#111',
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="miIcon"]')).to.have.lengthOf(1)
    chaiExpect(wrapper.find('[testID="faIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="antIcon"]')).to.have.lengthOf(0)
    chaiExpect(wrapper.find('[testID="mciIcon"]')).to.have.lengthOf(0)

    chaiExpect(wrapper.find('[testID="miIcon"]').props().name).to.be.equal(
      props.name,
    )
    chaiExpect(wrapper.find('[testID="miIcon"]').props().size).to.be.equal(
      props.size,
    )
    chaiExpect(wrapper.find('[testID="miIcon"]').props().color).to.be.equal(
      props.color,
    )
  })

  it('should be render disabled callable icon', () => {
    const props = {
      ...defaultProps,
      onClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    chaiExpect(wrapper.find('[testID="touchableField"]')).to.have.lengthOf(1)
    expect(props.onClick).not.toHaveBeenCalled()
    wrapper
      .find('[testID="touchableField"]')
      .props()
      .onPress()
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
