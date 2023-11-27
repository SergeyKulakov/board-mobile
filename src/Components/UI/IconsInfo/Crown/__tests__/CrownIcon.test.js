import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { CrownIcon as Component } from '../index'

describe('CrownIcon', () => {
  const defaultProps = {
    style: {},
    isVisible: true,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const withoutVisible = shallow(
      <Component {...defaultProps} isVisible={false} />,
    )

    expect([wrapper, withoutVisible]).toMatchSnapshot()
  })
})
