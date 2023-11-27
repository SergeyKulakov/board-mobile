import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../Header'

describe('Profile.Header', () => {
  const defaultProps = {
    onGoBack: () => null,
    onClickLanguageButton: () => null,
    t: () => null,
    getCurrentLanguage: () => 'en',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
