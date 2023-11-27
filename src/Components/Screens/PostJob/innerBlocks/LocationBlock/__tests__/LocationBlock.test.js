import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { LocationBlock as Component } from '../index'

describe('PostJob.LocationBlock', () => {
  const defaultProps = {
    text: {
      title: 'title',
      subTitle: 'subTitle',
      street: 'street',
      city: 'city',
      state: 'state',
      zip: 'zip',
    },
    values: {
      address: 'address',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      country: 'country',
    },
    geocode: {
      lat: 12.4123,
      lon: 12.4123,
    },
    onChange: () => null,
    isError: false,
    onBlur: () => null,
    onClickStreetAddress: () => null,
    onMapClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('change input', () => {
    const props = {
      ...defaultProps,
      onChange: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const args =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, ipsam.'

    wrapper
      .find('InputBlock')
      .get(0)
      .props.onChange(args)

    expect(props.onChange).toHaveBeenCalledTimes(1)
    expect(props.onChange).toHaveBeenLastCalledWith('city', args)

    wrapper
      .find('InputBlock')
      .get(1)
      .props.onChange(args)

    expect(props.onChange).toHaveBeenCalledTimes(2)
    expect(props.onChange).toHaveBeenLastCalledWith('state', args)

    wrapper
      .find('InputBlock')
      .get(2)
      .props.onChange(args)

    expect(props.onChange).toHaveBeenCalledTimes(3)
    expect(props.onChange).toHaveBeenLastCalledWith('zipCode', args)

    wrapper
      .find('InputBlock')
      .get(3)
      .props.onChange(args)

    expect(props.onChange).toHaveBeenCalledTimes(4)
    expect(props.onChange).toHaveBeenLastCalledWith('country', args)
  })
})
