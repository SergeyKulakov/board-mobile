import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { AboutServiceProvider as Component } from '../index'

describe('AboutServiceProvider', () => {
  const defaultProps = {
    comments: 0,
    distance: {
      length: 12,
      units: 'km',
    },
    jobsDoneCount: 3,
    star: 4,
    description: undefined,
    onCommentsClick: () => null,
  }

  it('render snapshots', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const wrapper2 = shallow(
      <Component {...defaultProps} description="description" />,
    )

    expect([wrapper, wrapper2]).toMatchSnapshot()
  })
})
