import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { RatingSlider as Component } from '../index'

describe('RatingSlider', () => {
  const defaultProps = {
    onChange: () => null,
    value: 3,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call touchableField', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onChange).not.toHaveBeenCalled()

    const { length } = wrapper.find(getTestID('touchableField'))

    for (let i = 0; i < length; i++) {
      wrapper
        .find(getTestID('touchableField'))
        .get(i)
        .props.onPress()
    }

    expect(props.onChange).toHaveBeenCalledTimes(length)
  })
})
