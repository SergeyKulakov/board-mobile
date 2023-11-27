import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { getJobImage } from 'Helpers/getImageUri'

import {
  ProviderPhoto,
  Image,
  NotificationText,
  NotificationIcon,
} from 'Components/UI'

import {
  Container,
  ImageWrapper,
  Content,
  Icon,
  DateWrapper,
  DateText,
  IconWrapper,
  ImageContainer,
  JobImageWrapper,
} from './style'

const NotificationCard = ({
  type,
  date,
  user,
  job,
  reason,
  isRead,
  t,
  onClickUser,
  onClickJob,
}) => {
  const renderImage = () => {
    if (job && _.has(job, 'pics[0]')) {
      return (
        <JobImageWrapper>
          <Image
            data={getJobImage(job._id, job.pics[0])}
            withLoading
            resizeMode="center"
          />
        </JobImageWrapper>
      )
    }

    if (_.isObject(user) && _.has(user, 'username')) {
      return (
        <ProviderPhoto
          isCheck={user.idVerified}
          username={user.username}
          avatarURL={user.avatarURL}
        />
      )
    }

    return <NotificationIcon />
  }

  return (
    <Container>
      <ImageWrapper>
        <ImageContainer>{renderImage()}</ImageContainer>
      </ImageWrapper>
      <Content>
        <NotificationText
          type={type}
          user={user}
          job={job}
          reason={reason}
          onClickJob={onClickJob}
          onClickUser={onClickUser}
        />
        <DateWrapper>
          <DateText>{t('notifications.on')}</DateText>
          <DateText isBold>{moment(date).format('DD/MM/YYYY')}</DateText>
          <DateText>{t('notifications.at')}</DateText>
          <DateText isBold>{moment(date).format('hh:mm A')}</DateText>
        </DateWrapper>
      </Content>
      {isRead ? null : (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
    </Container>
  )
}

NotificationCard.propTypes = {
  date: PropTypes.string,
  isRead: PropTypes.bool,
  job: PropTypes.object,
  t: PropTypes.func,
  reason: PropTypes.string,
  user: PropTypes.object,
  type: PropTypes.string,
  onClickUser: PropTypes.func,
  onClickJob: PropTypes.func,
}

export default NotificationCard
