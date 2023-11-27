import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('Registration.Header', () => {
  const defautProps = {
    isHideButton: false,
    onArrowClick: () => null,
    flagName: 'fff',
    onClickLanguageButton: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defautProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
