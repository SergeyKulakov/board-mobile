import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { LanguageButton as Component } from '../index'

describe('LanguageButton', () => {
  const defaultProps = {
    onClick: () => null,
    flagName: 'en',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
