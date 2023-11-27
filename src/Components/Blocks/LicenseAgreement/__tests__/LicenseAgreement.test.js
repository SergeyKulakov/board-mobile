import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../LicenseAgreement'

describe('LicenseAgreement', () => {
  const defaultProps = {
    text: undefined,
    value: false,
    onSuccess: () => null,
    onChange: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call onSuccess action', () => {
    const props = {
      ...defaultProps,
      onSuccess: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onSuccess).not.toHaveBeenCalled()

    wrapper.instance().handleUrl()

    expect(props.onSuccess).toHaveBeenCalledTimes(1)
  })
})
