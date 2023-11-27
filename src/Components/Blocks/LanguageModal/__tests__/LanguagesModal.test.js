import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'

import 'jest-styled-components'

import Component from '../LanguagesModal'

describe('LanguagesModal', () => {
  const defaultProps = {
    activeLanguage: 'en',
    visible: true,
    orientation: 'LANDSCAPE',
    onSetLanguage: () => null,
    onCloseModal: () => null,
    onChangeLanguage: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('change activeLanguage', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chai
      .expect(
        wrapper
          .find('FlatList')
          .props()
          .data.find(el => el.isActive).type,
      )
      .to.be.equal(defaultProps.activeLanguage)

    const nextLanguage = 'es'
    wrapper.setProps({ activeLanguage: nextLanguage })

    chai
      .expect(
        wrapper
          .find('FlatList')
          .props()
          .data.find(el => el.isActive).type,
      )
      .to.be.equal(nextLanguage)
  })

  it('should call keyExtractor', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const args = {
      type: 'type',
    }

    const key = wrapper
      .find('FlatList')
      .props()
      .keyExtractor(args)

    chai.expect(key).to.be.equal(args.type)
  })
})
