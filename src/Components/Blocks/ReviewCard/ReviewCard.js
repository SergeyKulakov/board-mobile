import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { getShortUserName } from 'Helpers/user'

import { Rating, CrownIcon, MoreIcon } from 'Components/UI'

import {
  Container,
  Header,
  HeaderColumn,
  NameRow,
  Name,
  Avatar,
  ServicesContainer,
  ServiceText,
  PopupWrapper,
  Content,
  Comment,
  CreatedAt,
  Popup,
} from './style'

const ReviewCard = ({
  author,
  rate,
  t,
  onDelete,
  onEdit,
  onOpenPopup,
  isOpenPopup,
  createdAt,
  comment,
  isPopupEnabled,
  onClosePopup,
}) => {
  const renderServices = () => {
    if (_.isEmpty(author.services)) return null

    const service = t(`services.${author.services[0].title}`)
    const more =
      author.services.length - 1
        ? ` & ${author.services.length - 1} ${t('common.more')}`
        : ''

    return (
      <ServicesContainer>
        <ServiceText>
          {service}
          {more}
        </ServiceText>
      </ServicesContainer>
    )
  }

  return (
    <Container>
      <Header>
        <Avatar
          avatarURL={author.avatarURL}
          isCheck={author.isVerified}
          username={author.username}
        />

        <HeaderColumn>
          <NameRow>
            <Name>
              {getShortUserName(
                author.given_name,
                author.family_name,
                author.username,
              )}
            </Name>
            <CrownIcon isVisible={author.isPremium} />
          </NameRow>
          <Rating value={Number(rate)} />
          {renderServices()}
        </HeaderColumn>
        {isPopupEnabled ? (
          <PopupWrapper>
            <MoreIcon onClick={onOpenPopup} />
            <Popup
              isVisible={isOpenPopup}
              onEdit={onEdit}
              onDelete={onDelete}
              onClose={onClosePopup}
            />
          </PopupWrapper>
        ) : null}
      </Header>
      <Content>
        <Comment>{comment}</Comment>
        <CreatedAt>{moment(createdAt).format('MM/DD/YYYY')}</CreatedAt>
      </Content>
    </Container>
  )
}

ReviewCard.propTypes = {
  comment: PropTypes.string,
  rate: PropTypes.number,
  createdAt: PropTypes.string,
  author: PropTypes.shape({
    avatarURL: PropTypes.string,
    isPro: PropTypes.bool,
    isVerified: PropTypes.bool,
    isPremium: PropTypes.bool,
    username: PropTypes.string,
    stars: PropTypes.string,
    services: PropTypes.array,
  }),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  t: PropTypes.func,
  onOpenPopup: PropTypes.func,
  isOpenPopup: PropTypes.bool,
  isPopupEnabled: PropTypes.bool,
  onClosePopup: PropTypes.func,
}

export default ReviewCard
