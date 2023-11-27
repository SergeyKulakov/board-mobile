import React from 'react'
import PropTypes from 'prop-types'
import { getShortUserName } from 'Helpers/user'

import { ActivityIndicator } from 'react-native'
import { ScreenHeader, CrownIcon } from 'Components/UI'
import {
  Container,
  Title,
  BackButton,
  TitleWrapper,
  Right,
  IconWrapper,
  LockUserIcon,
  LockUserIconRed,
} from './style'

const renderLockUserIcon = (isChatBlocked, onLockUserClick) => {
  return !isChatBlocked ? (
    <LockUserIcon onClick={onLockUserClick} />
  ) : (
    <LockUserIconRed onClick={onLockUserClick} />
  )
}

const Header = ({
  user = {},
  isChatBlocked,
  onBackClick,
  onLockUserClick,
  isChatInactive,
  isLockButtonLoading,
}) => (
  <ScreenHeader>
    <Container>
      <Right>
        <BackButton onClick={onBackClick} />
        <TitleWrapper>
          <Title>
            {getShortUserName(user.given_name, user.family_name, user.username)}
          </Title>
          <CrownIcon isVisible={Boolean(user.isPremium)} />
        </TitleWrapper>
      </Right>
      <IconWrapper>
        {!isChatInactive &&
          (isLockButtonLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            renderLockUserIcon(isChatBlocked, onLockUserClick)
          ))}
      </IconWrapper>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  user: PropTypes.shape({
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    isPremium: PropTypes.bool,
    username: PropTypes.string.isRequired,
  }),
  onLockUserClick: PropTypes.func,
  isLockButtonLoading: PropTypes.bool,
  isChatBlocked: PropTypes.bool,
  isChatInactive: PropTypes.bool,
}

export { Header }
