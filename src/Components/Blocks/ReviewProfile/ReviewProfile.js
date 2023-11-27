import React from 'react'
import PropTypes from 'prop-types'

import { Rating } from 'Components/UI'

import {
  Wrapper,
  AvatarWrapper,
  Avatar,
  Name,
  Row,
  Reviews,
  ReviewsWrapper,
  RatingWrapper,
} from './style'

const ReviewProfile = ({ avatar, userId, userName, rate, reviewsCount, t }) => (
  <Wrapper>
    <AvatarWrapper>
      <Avatar avatarURL={avatar} username={userId} />
    </AvatarWrapper>
    <Name>{userName}</Name>
    <Row>
      <RatingWrapper>
        <Rating value={rate} />
      </RatingWrapper>
      <ReviewsWrapper>
        <Reviews>
          {reviewsCount} {t('jobDetail.reviews')}
        </Reviews>
      </ReviewsWrapper>
    </Row>
  </Wrapper>
)

ReviewProfile.propTypes = {
  avatar: PropTypes.string,
  userId: PropTypes.string,
  userName: PropTypes.string,
  rate: PropTypes.number,
  reviewsCount: PropTypes.string,
  t: PropTypes.func,
}

export default ReviewProfile
