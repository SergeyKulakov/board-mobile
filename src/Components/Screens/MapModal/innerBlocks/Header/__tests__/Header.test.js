import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../index'

describe('CancelJobModal.Header', () => {
  const defaultProps = {
    onBackClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be call onBackClick callback when user click back icon', () => {
    const props = {
      ...defaultProps,
      onBackClick: jest.fn(),
    }
    const wrapper = shallow(<Component {...props} />)

    expect(props.onBackClick).not.toHaveBeenCalled()
    wrapper
      .find(getTestID('backButton'))
      .props()
      .onClick()
    expect(props.onBackClick).toHaveBeenCalledTimes(1)
  })
})
