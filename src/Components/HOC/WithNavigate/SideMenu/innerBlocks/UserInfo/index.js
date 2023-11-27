import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'Components/UI'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

import withNamespaces from '../../../../withNamespaces'

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
  Wrapper,
  styles,
} from './style'

const UserInfo = ({
  t,
  avatarUrl,
  userName,
  email,
  isPremium,
  onAvatarClick,
  onPremiumClick,
}) => (
  <Wrapper>
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
      </Block>
    </Container>
    {isPremium ? null : (
      <TouchableOpacity hitSlop={hitSlop} onPress={onPremiumClick}>
        <PremiumTextContainer>
          <PremiumText>{t('homePage.becomePremium')}</PremiumText>
        </PremiumTextContainer>
      </TouchableOpacity>
    )}
  </Wrapper>
)

UserInfo.propTypes = {
  avatarUrl: PropTypes.string,
  userName: PropTypes.string,
  email: PropTypes.string,
  isPremium: PropTypes.bool,
  onAvatarClick: PropTypes.func,
  onPremiumClick: PropTypes.func,
  t: PropTypes.func,
}

export default withNamespaces(UserInfo)
