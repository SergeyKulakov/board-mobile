import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ButtonsGroup'

describe('ButtonsGroup', () => {
  const defaultProps = {
    submitStyle: undefined,
    cancelStyle: undefined,
    cancelText: 'cancelText',
    submitText: 'submitText',
    t: text => text,
    onSubmit: () => null,
    onCancel: () => null,
    withHeight: false,
    isSubmitLoading: false,
    isCancelLoading: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should change button height', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.state('height')).toBe(100)

    wrapper.instance().handleSetButtonHeight({
      nativeEvent: {
        layout: {
          height: 250
        }
      }
    })

    expect(wrapper.state('height')).toBe(250)
  })
})
