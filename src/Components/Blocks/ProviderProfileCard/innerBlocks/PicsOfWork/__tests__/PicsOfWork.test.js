import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { PicsOfWork as Component } from '../index'

describe('PicsOfWork', () => {
  const defaultProps = {
    data: ['image', 'image', 'image', 'image'],
    onClick: () => null,
    getPicture: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('render items count', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.find(getTestID('item')).length).toBe(2)
    expect(wrapper.find(getTestID('lastItem')).length).toBe(1)
  })

  it('click item', () => {
    const props = {
      ...defaultProps,
      onClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const { length } = wrapper.find(getTestID('item'))

    for (let i = 0; i < length; i++) {
      wrapper
        .find(getTestID('item'))
        .get(i)
        .props.onPress()
    }

    expect(props.onClick).toHaveBeenCalledTimes(2)
  })
})
