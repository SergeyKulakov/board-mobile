import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../JobCard'

describe('JobCard', () => {
  const defaultProps = {
    doneBefore: 1570711498540,
    favouriteId: 'favouriteId',
    isPremium: false,
    onButtonClick: () => null,
    onDelete: () => null,
    onEdit: () => null,
    onRemoveClick: () => null,
    pics: [],
    title: 'title',
    isShowDialog: false,
    onClickMore: () => null,
    onCancelClick: () => null,
    jobStatus: 'posted',
    applicationId: 'applicationId',
    application: {
      status: 'accepted',
    },
    onSelectClick: () => null,
    isFavouriteLoading: false,
    onFavouriteClick: () => null,
    onShareClick: () => null,
    _id: 'jobId',
    budget: '1234',
    currency: 'USD',
    description: '',
    distance: {
      lengthM: 1234123,
      length: 321,
      units: 'km',
    },
    t: text => text,
    onTrackClick: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const secontProps = {
      ...defaultProps,
      applicationId: undefined,
      onSelectClick: undefined,
      onRemoveClick: undefined,
      onFavouriteClick: undefined,
      onEdit: undefined,
      onCancelClick: undefined,
      onTrackClick: undefined,
    }

    const secontWrapper = shallow(<Component {...secontProps} />)

    expect([wrapper, secontWrapper]).toMatchSnapshot()
  })
})
