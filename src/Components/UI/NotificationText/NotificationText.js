import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import { types } from 'Helpers/notifications'

import { getShortUserName } from 'Helpers/user'

import { Container, Message, TextLink } from './style'

const NotificationText = ({
  type,
  user = {},
  job = {},
  reason,
  onClickUser,
  onClickJob,
  t,
}) => {
  const givenName = user.given_name
  const familyName = user.family_name
  const userName = user.username
  const jobTitle = job.title

  const shortName = getShortUserName(givenName, familyName, userName)

  const startDate = moment(job.startDate)
  const formattedDate = moment(startDate).isValid()
    ? startDate.format('MMMM D, YYYY [@] H:MM A')
    : job.startDate
  let address = job.streetAddress
  if (job.city) address = `${address}, ${job.city}`
  if (job.country) address = `${address} ${job.country}`
  if (job.zipCode) address = `${address} ${job.zipCode}`

  const renderJobLink = () => (
    <TextLink disabled={!_.isFunction(onClickJob)} onPress={onClickJob}>
      {jobTitle}
    </TextLink>
  )

  const renderUserLink = () => (
    <TextLink disabled={!_.isFunction(onClickUser)} onPress={onClickUser}>
      {shortName}
    </TextLink>
  )

  switch (type) {
    case types.trackingAvailable:
      return (
        <Container>
          <Message>{t('notifications.trackingJob')} </Message>
          {renderJobLink()}
          <Message> {t('notifications.trackingAvailable')}</Message>
        </Container>
      )
    case types.appliedForJob:
      return (
        <Container>
          {renderUserLink()}
          <Message> {t('notifications.applyJobNotificationMessage')} </Message>
          {renderJobLink()}
        </Container>
      )
    case types.jobMatchesProfile:
      return (
        <Container>
          <Message>{t('notifications.followingJob')} </Message>
          {renderJobLink()}
          <Message> {t('notifications.mutchesProfile')}</Message>
        </Container>
      )
    case types.newMessage:
      return (
        <Container>
          {renderUserLink()}
          <Message> {t('notifications.sendMessage')}</Message>
        </Container>
      )
    case types.newJobRequest:
      return (
        <Container>
          {renderUserLink()}
          <Message> {t('notifications.likeToHire')} </Message>
          {renderJobLink()}
        </Container>
      )
    case types.appointmentRemider:
      return (
        <Container>
          <Message>{t('notifications.appointmentReminder')}: </Message>
          {renderJobLink()}
          <Message>
            {' '}
            {address} @{' '}
            {startDate.isValid()
              ? startDate.format('MMMM D, YYYY H:MM A')
              : job.startDate}
          </Message>
        </Container>
      )
    case types.jobRequestRejected:
      return (
        <Container>
          {renderUserLink()}
          <Message> {t('notifications.rejectOffer')} </Message>
          {renderJobLink()}
        </Container>
      )
    case types.jobRequestAccepted:
      return (
        <Container>
          {renderUserLink()}
          <Message> {t('notifications.acceptedOffer')} </Message>
          {renderJobLink()}
        </Container>
      )
    case types.appointmentScheduled:
      return (
        <Container>
          <Message>
            {t('notifications.NotificationJobBooked')}
            {t('notifications.NotificationappointmentScheduledFor')}{' '}
          </Message>
          {renderJobLink()}
          <Message>
            : {formattedDate} - {address}
          </Message>
        </Container>
      )
    case types.jobCancelled:
      return (
        <Container>
          {renderJobLink()}
          <Message>
            {' '}
            {t('LeftoverOnes.thisJobCancelled')}.{' '}
            {t('LeftoverOnes.reasonCancelling')}:
          </Message>
          <TextLink> {reason}</TextLink>
        </Container>
      )
    case types.jobUnavailable:
      return (
        <Container>
          <Message>{t('notifications.jobUnavailable')} </Message>
          {renderJobLink()}
        </Container>
      )
    default:
      return (
        <Container>
          <Message>{type}</Message>
        </Container>
      )
  }
}

NotificationText.propTypes = {
  job: PropTypes.object,
  t: PropTypes.func,
  type: PropTypes.string,
  user: PropTypes.object,
  onClickJob: PropTypes.func,
  onClickUser: PropTypes.func,
}

export default NotificationText
