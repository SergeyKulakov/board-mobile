import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { VerifyError as Component } from '../index'

describe('Profile.VerifyError', () => {
  const defaultProps = {
    text: {
      info: 'info',
      link: 'link',
    },
    loading: false,
    onClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
