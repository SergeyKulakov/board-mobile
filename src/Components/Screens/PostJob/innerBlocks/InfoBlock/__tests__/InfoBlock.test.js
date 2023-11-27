import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { InfoBlock as Component } from '../index'

describe('PostJob.InfoBlock', () => {
  const defaultProps = {
    values: {
      title: 'title',
      description: 'description',
      budget: 'budget',
      currencyCode: 'currencyCode',
    },
    text: {
      title: 'title',
      jobTitle: 'jobTitle',
      jobDescription: 'jobDescription',
      budget: '1234',
      getError: () => null,
    },
    errors: {
      title: 'title',
      description: 'description',
      budget: 'budget',
    },
    touched: {
      title: false,
      description: false,
      budget: false,
    },
    onBlur: () => null,
    onChange: () => null,
    setFieldTouched: () => null,
    onClickCurrency: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should set touched', () => {
    const props = {
      ...defaultProps,
      setFieldTouched: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const { length } = wrapper.find(getTestID('infoInput'))

    for (let i = 0; i < length; i++) {
      wrapper
        .find(getTestID('infoInput'))
        .get(i)
        .props.onSetTouched()
    }

    expect(props.setFieldTouched).toHaveBeenCalledTimes(2)
  })
})
