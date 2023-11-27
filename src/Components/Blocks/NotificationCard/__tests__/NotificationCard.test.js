import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../NotificationCard'

describe('NotificationCard', () => {
  const defaultProps = {
    type: 'type',
    date: 1571651436414,
    user: {
      idVerified: '1234sdqwe',
      username: 'userId',
      avatarURL: 'avatarUrl',
    },
    job: {
      _id: 'jobId',
      pics: ['pick1', 'pick2'],
    },
    reason: 'reason',
    isRead: false,
    t: text => text,
    onClickUser: () => null,
    onClickJob: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const withoutJob = shallow(<Component {...defaultProps} job={null} />)
    const withoutData = shallow(
      <Component {...defaultProps} job={null} user={null} />,
    )

    expect([wrapper, withoutJob, withoutData]).toMatchSnapshot()
  })
})
