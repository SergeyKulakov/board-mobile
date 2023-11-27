import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { ApplyJobModal as Component } from '../index'

describe('ApplyJobModal', () => {
  const defaultProps = {
    visible: false,
    onCancel: () => null,
    onSubmit: () => null,
    loading: false,
    text: {
      title: '',
      subTitle: '',
      apply: '',
      skip: '',
    },
  }
  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
