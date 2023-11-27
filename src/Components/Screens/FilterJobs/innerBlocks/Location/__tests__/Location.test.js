import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Location as Component } from '../index'

describe('FilterJobs.Location', () => {
  const defaultProps = {
    text: {
      addressLabel: 'addressLabel',
      addressPlaceholder: 'addressPlaceholder',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      country: 'country',
    },
    address: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    country: undefined,
    lat: undefined,
    lon: undefined,
    onChangeCity: () => null,
    onChangeState: () => null,
    onChangeZipCode: () => null,
    onChangeCountry: () => null,
    onOpenLocationModal: () => null,
    onMapClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
