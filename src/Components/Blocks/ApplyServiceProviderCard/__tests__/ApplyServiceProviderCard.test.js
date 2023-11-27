import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ApplyServiceProviderCard'

describe('ApplyServiceProviderCard', () => {
  const defaultProps = {
    givenName: 'givenName',
    familyName: 'familyName',
    username: 'username',
    avatarURL: null,
    stars: 4,
    idVerified: false,
    isUserJob: false,
    services: [],
    isAcceptLoading: false,
    isAccepted: false,
    onAcceptClick: () => null,
    onRejectClick: () => null,
    onHire: () => null,
    style: undefined,
    onRemoveClick: () => null,
  }
  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })
})
