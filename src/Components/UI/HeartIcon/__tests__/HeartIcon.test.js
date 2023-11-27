import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { HeartIcon as Component } from '../index'

describe('HeartIcon', () => {
  const defaultProps = {
    isActive: true,
    size: 12,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const withoutActive = shallow(
      <Component {...defaultProps} isActive={false} />,
    )

    expect([wrapper, withoutActive]).toMatchSnapshot()
  })
})
