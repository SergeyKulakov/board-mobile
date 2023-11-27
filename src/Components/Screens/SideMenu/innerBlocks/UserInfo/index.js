import React from 'react'
import PropTypes from 'prop-types'

import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

import { Icon } from 'Components/UI'
import { hitSlop } from './config'
import {
  Container,
  Avatar,
  Title,
  SubTitle,
  PremiumText,
  Block,
  AvatarContainer,
  PremiumTextContainer,
  styles,
} from './style'

const UserInfo = ({
  text,
  avatarUrl,
  userName,
  email,
  isPremium,
  onAvatarClick,
  onPremiumClick,
  onSetPremium,
}) => (
  <Container>
    <TouchableWithoutFeedback onPress={onAvatarClick}>
      <AvatarContainer isHasntAvatar={!avatarUrl}>
        {avatarUrl ? <Avatar url={avatarUrl} /> : <Icon {...styles.Icon} />}
      </AvatarContainer>
    </TouchableWithoutFeedback>
    <Block>
      <TouchableWithoutFeedback onPress={onAvatarClick}>
        <>
          {userName && <Title>{userName}</Title>}
          <SubTitle>{email}</SubTitle>
        </>
      </TouchableWithoutFeedback>
      {!isPremium && (
        <TouchableOpacity
          hitSlop={hitSlop}
          onPress={onPremiumClick}
          onLongPress={onSetPremium}
        >
          <PremiumTextContainer>
            <PremiumText numberOfLines={1} ellipsizeMode="middle">
              {text.isPremium}
            </PremiumText>
          </PremiumTextContainer>
        </TouchableOpacity>
      )}
    </Block>
  </Container>
)

UserInfo.propTypes = {
  text: PropTypes.object,
  avatarUrl: PropTypes.string,
  userName: PropTypes.string,
  email: PropTypes.string,
  isPremium: PropTypes.bool,
  onAvatarClick: PropTypes.func,
  onPremiumClick: PropTypes.func,
  onSetPremium: PropTypes.func,
}

export { UserInfo }
