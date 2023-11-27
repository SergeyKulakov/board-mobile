import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { JobImages as Component } from '../index'

describe('JobImages', () => {
  const defaultProps = {
    data: new Array(6).fill('imagePath'),
    onClickItem: () => null,
    onClickMore: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call image click action', () => {
    const props = {
      ...defaultProps,
      onClickItem: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const { length } = wrapper.find('Image')

    for (let i = 0; i < length; i++) {
      wrapper
        .find('Image')
        .get(i)
        .props.onClick()
    }

    expect(props.onClickItem).toHaveBeenCalledTimes(5)
  })
})
