import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withNamespaces } from 'Components/HOC'

import {
  ScreenHeader,
  Icon,
  BackIcon,
  Hamburger,
  MoreIcon,
  Dialog,
} from 'Components/UI'

import {
  Container,
  Block,
  LeftButtonsWrapper,
  BackIconWrapper,
  RightButtonsWrapper,
  CrownCircle,
  TitleColumn,
  TitleRow,
  Title,
  SubTitle,
  HeartIcon,
  PostedActionsView,
  styles,
} from './style'

class Header extends PureComponent {
  _renderFavouriteButton = () => {
    const {
      isFavourite,
      isFavouriteLoading,
      onFavouriteClick,
      isFavouriteDisable,
    } = this.props
    if (_.isFunction(onFavouriteClick) && !isFavouriteDisable) {
      return (
        <HeartIcon
          isActive={isFavourite}
          loading={isFavouriteLoading}
          onClick={onFavouriteClick}
        />
      )
    }

    return null
  }

  _renderPostedJobActions = () => {
    const {
      onEditClick,
      onDeleteClick,
      isOpenPostedPopup,
      onOpenPostedActions,
      isShowPostedActions,
    } = this.props

    if (isShowPostedActions) {
      return (
        <PostedActionsView>
          <MoreIcon color="#fff" onClick={onOpenPostedActions} />
          <Dialog
            onDelete={onDeleteClick}
            onEdit={onEditClick}
            isVisible={isOpenPostedPopup}
            onClose={onOpenPostedActions}
          />
        </PostedActionsView>
      )
    }
  }

  render() {
    const {
      isPremium,
      title,
      isBookedJob,
      appliedBy,
      onBackClick,
      onHamburgerClick,
      onShareClick,
      t,
    } = this.props

    return (
      <ScreenHeader>
        <Container>
          <LeftButtonsWrapper>
            <BackIconWrapper>
              <BackIcon onClick={onBackClick} />
            </BackIconWrapper>
            <Hamburger onClick={onHamburgerClick} />
          </LeftButtonsWrapper>
          <Block flex={5}>
            <TitleColumn>
              <TitleRow>
                <Title>{title}</Title>
                {isPremium ? (
                  <CrownCircle>
                    <Icon {...styles.CrownIcon} />
                  </CrownCircle>
                ) : null}
              </TitleRow>
              {isBookedJob ? (
                <SubTitle>{t('myJobsDetail.booked')}</SubTitle>
              ) : (
                <SubTitle>
                  {t('jobDescription.appliedBy')}: {appliedBy || 0}
                </SubTitle>
              )}
            </TitleColumn>
          </Block>
          <RightButtonsWrapper>
            {this._renderFavouriteButton()}
            <Icon {...styles.ShareIcon} onClick={onShareClick} />
            {this._renderPostedJobActions()}
          </RightButtonsWrapper>
        </Container>
      </ScreenHeader>
    )
  }
}

Header.propTypes = {
  appliedBy: PropTypes.number,
  isBookedJob: PropTypes.bool,
  isFavourite: PropTypes.bool,
  isFavouriteDisable: PropTypes.bool,
  isFavouriteLoading: PropTypes.bool,
  isPremium: PropTypes.bool,
  onBackClick: PropTypes.func.isRequired,
  onFavouriteClick: PropTypes.func,
  onHamburgerClick: PropTypes.func.isRequired,
  onShareClick: PropTypes.func,
  t: PropTypes.any,
  title: PropTypes.string,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  isOpenPostedPopup: PropTypes.bool,
  isShowPostedActions: PropTypes.bool,
  onOpenPostedActions: PropTypes.func,
}

export default withNamespaces(Header)
