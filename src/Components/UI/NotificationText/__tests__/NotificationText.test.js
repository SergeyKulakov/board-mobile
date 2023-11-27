import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { types } from 'Helpers/notifications'

import Component from '../NotificationText'

describe('MoreText', () => {
  const defaultProps = {
    job: {
      title: 'jobTitle',
      startDate: 1571638857305,
      streetAddress: 'address',
      city: 'city',
      country: 'country',
      zipCode: '123214',
    },
    t: text => text,
    type: undefined,
    user: {
      given_name: 'given_name',
      family_name: 'family_name',
      username: 'username',
    },
    onClickJob: () => null,
    onClickUser: () => null,
  }

  it('render snapshot', () => {
    const defaultWrapper = shallow(<Component {...defaultProps} />)
    const trackingAvailable = shallow(
      <Component {...defaultProps} type={types.trackingAvailable} />,
    )
    const appliedForJob = shallow(
      <Component {...defaultProps} type={types.appliedForJob} />,
    )

    const jobMatchesProfile = shallow(
      <Component {...defaultProps} type={types.jobMatchesProfile} />,
    )

    const newMessage = shallow(
      <Component {...defaultProps} type={types.newMessage} />,
    )

    const newJobRequest = shallow(
      <Component {...defaultProps} type={types.newJobRequest} />,
    )

    const appointmentRemider = shallow(
      <Component {...defaultProps} type={types.appointmentRemider} />,
    )

    const jobRequestRejected = shallow(
      <Component {...defaultProps} type={types.jobRequestRejected} />,
    )

    const jobRequestAccepted = shallow(
      <Component {...defaultProps} type={types.jobRequestAccepted} />,
    )

    const appointmentScheduled = shallow(
      <Component {...defaultProps} type={types.appointmentScheduled} />,
    )

    const jobCancelled = shallow(
      <Component {...defaultProps} type={types.jobCancelled} />,
    )

    const jobUnavailable = shallow(
      <Component {...defaultProps} type={types.jobUnavailable} />,
    )

    expect([
      defaultWrapper,
      trackingAvailable,
      appliedForJob,
      jobMatchesProfile,
      newMessage,
      newJobRequest,
      appointmentRemider,
      jobRequestRejected,
      jobRequestAccepted,
      appointmentScheduled,
      jobCancelled,
      jobUnavailable,
    ]).toMatchSnapshot()
  })
})
