import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Icon, StarsIcon, CrownIcon, Image } from 'Components/UI'

import { hitSlop } from './config'
import {
  Container,
  Header,
  HeaderText,
  Content,
  AvatarContainer,
  InfoContainer,
  NameContainer,
  NameText,
  OtherText,
  ReviewsText,
  SubNameContainer,
  StarsIconWrapper,
  ReviewsTextWrapper,
  styles,
} from './style'

const CustomerInfo = ({
  text,
  avatar,
  userName,
  givenName,
  familyName,
  isPremium,
  stars,
  reviewCount,
  onClickReviews,
  onClickOtherPosted,
  onClick,
}) => (
  <Container>
    <Header onPress={onClick}>
      <HeaderText>{text.title}</HeaderText>
    </Header>
    <Content>
      <TouchableWithoutFeedback onPress={onClick}>
        <AvatarContainer>
          {avatar ? (
            <Image data={avatar} resizeMode="cover" withLoading />
          ) : (
            <Icon {...styles.DefaultAvatar} />
          )}
        </AvatarContainer>
      </TouchableWithoutFeedback>
      <InfoContainer>
        <NameContainer>
          {givenName && familyName ? (
            <NameText>{`${givenName} ${familyName[0]}.`}</NameText>
          ) : (
            <NameText>{userName}</NameText>
          )}
          {isPremium && <CrownIcon />}
        </NameContainer>
        <SubNameContainer>
          <StarsIconWrapper>
            <StarsIcon value={stars} />
          </StarsIconWrapper>
          <ReviewsTextWrapper hitSlop={hitSlop} onPress={onClickReviews}>
            <ReviewsText>
              {reviewCount || 0} {text.reviewCount}
            </ReviewsText>
          </ReviewsTextWrapper>
        </SubNameContainer>
        <TouchableOpacity hitSlop={hitSlop} onPress={onClickOtherPosted}>
          <OtherText>{text.otherPostedJobs}</OtherText>
        </TouchableOpacity>
      </InfoContainer>
    </Content>
  </Container>
)

CustomerInfo.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    reviewCount: PropTypes.string,
    otherPostedJobs: PropTypes.string,
  }),
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  givenName: PropTypes.string,
  userName: PropTypes.string,
  familyName: PropTypes.string,
  isPremium: PropTypes.bool,
  stars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reviewCount: PropTypes.number,
  onClickReviews: PropTypes.func,
  onClickOtherPosted: PropTypes.func,
}

export default CustomerInfo
