import React from 'react'
import PropTypes from 'prop-types'
import isUrl from 'is-url'

import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import {
  ScreenHeader,
  Icon,
  ScreenTitle,
  Hamburger,
  Image,
} from 'Components/UI'
import { getProfileImage } from 'Helpers/getImageUri'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'

import {
  Container,
  Block,
  AvatarContainer,
  DefaultAvatarBlock,
  Points,
  styles,
} from './style'

const Header = ({
  screenTitle,
  searchProps,
  onOpenSidebar,
  avatar,
  isRequest,
  userId,
  onAvatarClick,
  pts,
  t,
  onPointsClick,
}) => {
  const _renderAvatar = () => {
    if (!avatar) {
      return (
        <TouchableWithoutFeedback onPress={onAvatarClick} testID="avatarIcon">
          <DefaultAvatarBlock>
            <Icon {...styles.Icon} />
          </DefaultAvatarBlock>
        </TouchableWithoutFeedback>
      )
    }
    if (isRequest) {
      return (
        <TouchableWithoutFeedback onPress={onAvatarClick} testID="avatarLoader">
          <DefaultAvatarBlock>
            <ActivityIndicator {...styles.ActivityIndicator} />
          </DefaultAvatarBlock>
        </TouchableWithoutFeedback>
      )
    }
    if (avatar) {
      let image
      if (isUrl(avatar)) {
        image = avatar
      } else {
        image = getProfileImage({
          type: profileImageTypes.avatar,
          src: avatar,
          userId,
        })
      }

      return (
        <TouchableWithoutFeedback onPress={onAvatarClick}>
          <AvatarContainer>
            <Image data={image} withLoading {...styles.Image} />
          </AvatarContainer>
        </TouchableWithoutFeedback>
      )
    }
  }

  return (
    <ScreenHeader searchProps={searchProps}>
      <Container>
        <Block flex={2}>
          <Hamburger onClick={onOpenSidebar} />
        </Block>
        <Block flex={8} justify-content="center">
          <ScreenTitle style={styles.Title}>{screenTitle}</ScreenTitle>
        </Block>
        <Block flex={4} justifyContent="flex-end">
          <TouchableWithoutFeedback onPress={onPointsClick}>
            <Points>
              {String(pts || 0)} {t('subscriptionScreen.pts')}
            </Points>
          </TouchableWithoutFeedback>
          {_renderAvatar()}
        </Block>
      </Container>
    </ScreenHeader>
  )
}

Header.propTypes = {
  screenTitle: PropTypes.string.isRequired,
  userId: PropTypes.string,
  avatar: PropTypes.string,
  isRequest: PropTypes.bool,
  searchProps: PropTypes.shape({
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  onOpenSidebar: PropTypes.func.isRequired,
  onAvatarClick: PropTypes.func.isRequired,
  pts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  t: PropTypes.func,
  onPointsClick: PropTypes.func,
}

export default Header
