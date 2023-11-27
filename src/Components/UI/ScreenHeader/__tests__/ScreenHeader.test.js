import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ScreenHeader, BackIcon, Hamburger, ScreenTitle } from '../index'

describe('Screen Header', () => {
  const defaultProps = {
    style: {},
    searchProps: {
      value: '',
      placeholder: '',
      disabled: false,
      onChange: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onSubmit: () => null,
    },
  }

  it('render snapshot', () => {
    const ScreenHeaderWrapper = shallow(<ScreenHeader {...defaultProps} />)
    const BackIconWrapper = shallow(<BackIcon onClick={() => null} />)
    const HamburgerWrapper = shallow(<Hamburger onClick={() => null} />)
    const ScreenTitleWrapper = shallow(<ScreenTitle style={{}} />)

    expect([
      ScreenHeaderWrapper,
      BackIconWrapper,
      HamburgerWrapper,
      ScreenTitleWrapper,
    ]).toMatchSnapshot()
  })
})
