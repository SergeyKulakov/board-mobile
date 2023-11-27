import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { UploadImage as Component } from '../index'

describe('UploadImage', () => {
  const defaultProps = {
    image: 'image',
    style: undefined,
    icon: undefined,
    onChange: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
