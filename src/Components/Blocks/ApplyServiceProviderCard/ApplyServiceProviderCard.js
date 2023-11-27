import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getServiceMoreString } from 'Helpers/services'
import { getShortUserName } from 'Helpers/user'

import { ProviderPhoto } from 'Components/UI'

import { ButtonsGroup } from '../index'
import {
  Container,
  Content,
  Stars,
  AvatarWrapper,
  DescriptionWrapper,
  UserName,
  ServiceText,
  RemoveIcon,
  Header,
} from './style'

const ApplyServiceProviderCard = ({
  givenName,
  familyName,
  username,
  avatarURL,
  stars,
  idVerified,
  isUserJob,
  services,
  onRejectClick,
  style,
  onRemoveClick,
  t,
  isAccepted,
  onAcceptClick,
  onHire,
  isAcceptLoading,
}) => {
  return (
    <Container style={style}>
      <Content>
        <AvatarWrapper>
          <ProviderPhoto
            username={username}
            avatarURL={avatarURL}
            isCheck={idVerified}
          />
        </AvatarWrapper>
        <DescriptionWrapper>
          <Header>
            <UserName>
              {getShortUserName(givenName, familyName, username)}
            </UserName>
            {_.isFunction(onRemoveClick) ? (
              <RemoveIcon onClick={onRemoveClick} />
            ) : null}
          </Header>
          <Stars>{stars}</Stars>
          <ServiceText>{getServiceMoreString(services)}</ServiceText>
        </DescriptionWrapper>
      </Content>
      {isUserJob ? (
        <ButtonsGroup
          cancelText={t('serviceProvider.reject')}
          submitText={
            isAccepted
              ? t('serviceProvider.hireNow')
              : t('serviceProvider.accept')
          }
          isSubmitLoading={isAcceptLoading}
          onSubmit={isAccepted ? onHire : onAcceptClick}
          onCancel={onRejectClick}
        />
      ) : null}
    </Container>
  )
}

ApplyServiceProviderCard.propTypes = {
  avatarURL: PropTypes.string,
  familyName: PropTypes.string,
  givenName: PropTypes.string,
  isAcceptLoading: PropTypes.bool,
  isUserJob: PropTypes.bool,
  isAccepted: PropTypes.bool,
  onAcceptClick: PropTypes.func,
  onRejectClick: PropTypes.func,
  onHire: PropTypes.func,
  services: PropTypes.array,
  stars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  username: PropTypes.string,
  style: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
  idVerified: PropTypes.bool,
  onRemoveClick: PropTypes.func,
  t: PropTypes.func,
}

export default ApplyServiceProviderCard
