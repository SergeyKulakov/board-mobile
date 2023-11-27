import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../OnBoarding'

describe('OnBoarding', () => {
  const defaultProps = {
    onSetLanguage: () => null,
    onSetSkipTutorial: () => null,
    onSetSystemLanguage: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('set language', () => {
    const props = {
      ...defaultProps,
      onSetLanguage: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onSetLanguage).not.toHaveBeenCalled()

    wrapper.instance().handleSetLanguage()

    expect(props.onSetLanguage).toBeCalledTimes(1)
  })
})
