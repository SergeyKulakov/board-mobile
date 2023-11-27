import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Header as Component } from '../index'

describe('FilterJobs.Header', () => {
  const defaultProps = {
    text: {
      title: 'title',
      clearText: 'clearText',
    },
    onBackClick: () => null,
    onClearClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
