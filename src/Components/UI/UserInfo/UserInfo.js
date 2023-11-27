import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isFunction } from 'lodash'
import {
  ProviderPhoto,
  ProIcon,
  CrownIcon,
  StarsIcon,
  CommentsIcon,
  DistanceIcon,
} from '../index'

import {
  AvatarContainer,
  CrownIconWrapper,
  DoneJobsText,
  DoneNumber,
  Header,
  HeaderInfoContainer,
  InfoRow,
  JobsDoneBlock,
  NameBlock,
  NameText,
  BorderedContainer,
  styles,
} from './style'
import { getUserName } from './memoize'

const UserInfo = ({
  t,
  name,
  avatarURL,
  idVerified,
  username,
  isPro,
  isPremium,
  jobsDoneCount,
  given_name,
  family_name,
  rate,
  reviewsCount,
  distance,
  onCommentClick,
}) => {
  const userName = name || getUserName(given_name, family_name, username)

  return (
    <Header>
      <AvatarContainer>
        <ProviderPhoto
          avatarURL={avatarURL}
          isCheck={idVerified}
          username={username}
        />
      </AvatarContainer>

      <HeaderInfoContainer>
        <NameBlock>
          <NameText>{userName}</NameText>
          <ProIcon isVisible={isPro} />
          <CrownIconWrapper>
            <CrownIcon isVisible={isPremium} />
          </CrownIconWrapper>
        </NameBlock>
        <InfoRow>
          <BorderedContainer isFirst pl={0}>
            <StarsIcon value={rate || 0} icon={styles.InfoIcon} />
          </BorderedContainer>

          <BorderedContainer
            disabled={!isFunction(onCommentClick)}
            onPress={onCommentClick}
          >
            <CommentsIcon value={reviewsCount || 0} icon={styles.InfoIcon} />
          </BorderedContainer>

          {!isEmpty(distance) ? (
            <BorderedContainer pr={0}>
              <DistanceIcon
                icon={styles.InfoIcon}
                value={distance.length}
                units={distance.units}
              />
            </BorderedContainer>
          ) : null}
        </InfoRow>

        <JobsDoneBlock>
          <DoneNumber>{jobsDoneCount || 0} </DoneNumber>
          <DoneJobsText>{t('serviceProvider.jobsDone')}</DoneJobsText>
        </JobsDoneBlock>
      </HeaderInfoContainer>
    </Header>
  )
}

UserInfo.propTypes = {
  avatarURL: PropTypes.string,
  distance: PropTypes.object,
  family_name: PropTypes.string,
  given_name: PropTypes.string,
  idVerified: PropTypes.boolean,
  isPremium: PropTypes.bool,
  isPro: PropTypes.bool,
  jobsDoneCount: PropTypes.number,
  rate: PropTypes.string,
  reviewsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  t: PropTypes.func,
  username: PropTypes.string,
  onCommentClick: PropTypes.func,
}

export default UserInfo
