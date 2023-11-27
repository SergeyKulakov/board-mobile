import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import memoize from 'memoize-one'
import * as routes from 'Constants/routes'
import statuses from 'Constants/statuses'
import { getProfilePics } from 'Helpers/user'

import { RefreshControl } from 'react-native'
import { SliderAdvertising, JobImages, ButtonsGroup } from 'Components/Blocks'
import {
  ProviderPhoto,
  CrownIcon,
  AboutServiceProvider,
  ServicesWrapRow,
  IconButton,
  Button,
  ProIcon,
} from 'Components/UI'

import { Header } from './innerBlocks'

import styles, {
  Container,
  HeaderProfileWrapper,
  ProfileName,
  Content,
  ProviderPhotoWrapper,
  Section,
  JobImagesWrapper,
  SectionTitle,
  ServicesWrapRowWrapper,
  ChatWrapper,
  LinkPreview,
  CrownIconWrapper,
} from './style'

class ServiceProviderProfile extends PureComponent {
  constructor(props) {
    super(props)

    const { profile, userId } = props

    this.state = {
      isFavouriteLoading: false,
      applicationStatus: _.get(props, 'applyApplication.status'),
      isRequest: _.isString(userId),
    }

    this.isIAm = props.user.username === profile.username
  }

  getPics = memoize(getProfilePics)

  componentDidMount() {
    const { userId } = this.props

    if (userId) this.handleUpdate(userId)
  }

  handleUpdate = userId => {
    const {
      onLoadProfile,
      profile,
      onShowPuck,
      getError,
      navigate,
      user,
    } = this.props

    const requestUserName = _.isString(userId) ? userId : profile.username

    this.setState({ isRequest: true }, () => {
      onLoadProfile(requestUserName, ({ error }) => {
        this.setState({ isRequest: false }, () => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
              callback: navigate.pop,
            })
          } else {
            this.isIAm = user.username === profile.username
          }
        })
      })
    })
  }

  handleFavouriteClick = () => {
    const {
      profile,
      onAddFavorite,
      onDeleteFavourite,
      getError,
      onShowPuck,
    } = this.props

    this.setState({ isFavouriteLoading: true })
    if (_.isString(profile.favouriteId)) {
      onDeleteFavourite(profile.favouriteId, ({ error }) => {
        this.setState({ isFavouriteLoading: false })
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            delay: 3000,
          })
        }
      })
    } else {
      onAddFavorite(profile.username, ({ error }) => {
        this.setState({ isFavouriteLoading: false })
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            delay: 3000,
          })
        }
      })
    }
  }

  handleShareClick = () => {
    const { profile, onSPShare } = this.props

    onSPShare(profile)
  }

  handleClickImage = index => {
    const { profile, navigate } = this.props

    const pics = this.getPics(
      profile.picsOfWork,
      profile.certificates,
      profile.username,
    )

    navigate.showModal(routes.imagesSlider, {
      data: pics,
      activeIndex: _.isNumber(index) ? index : 1,
    })
  }

  handleChatClick = () => {
    const { profile, onConnectToChat } = this.props
    onConnectToChat(profile)
  }

  handleHire = () => {
    const { navigate, applyApplication, onHire } = this.props

    onHire(applyApplication, () => navigate.popTo(routes.myJobs))
  }

  handleReject = () => {
    const { navigate, applyApplication, onReject } = this.props

    onReject(applyApplication)
    navigate.pop()
  }

  handleAccept = () => {
    const { applyApplication, onAccept } = this.props

    onAccept(applyApplication)
    this.setState({ applicationStatus: statuses.accepted })
  }

  handleOpenReviews = () => {
    const { navigate, profile } = this.props

    navigate.push(routes.reviews, {
      userId: profile.username,
    })
  }

  renderHeaderProfile = () => {
    const { profile } = this.props

    const username =
      _.isString(profile.given_name) && _.isString(profile.family_name)
        ? `${profile.given_name} ${profile.family_name[0]}.`
        : profile.username

    return (
      <HeaderProfileWrapper>
        <ProviderPhotoWrapper>
          <ProviderPhoto
            avatarURL={profile.avatarURL}
            username={profile.username}
            isCheck={profile.idVerified}
          />
        </ProviderPhotoWrapper>
        <ProfileName>{username}</ProfileName>
        <ProIcon isVisible={profile.isPro} />
        <CrownIconWrapper>
          <CrownIcon isVisible={profile.isPremium} />
        </CrownIconWrapper>
      </HeaderProfileWrapper>
    )
  }

  _renderHireButton = () => {
    const { profile, user, onSendRequest, t, applyApplication } = this.props

    if (profile.username === user.username || applyApplication) return null

    return (
      <Button onClick={onSendRequest} linear>
        {t('serviceProvider.hireNow')}
      </Button>
    )
  }

  _renderApplicationButtons = () => {
    const { t, loadApplicationId, user, job } = this.props
    const { applicationStatus } = this.state

    if (
      !applicationStatus ||
      _.get(job, 'author.username') !== user.username ||
      _.has(job, 'doer')
    )
      return null

    const isAccepted = applicationStatus === statuses.accepted

    return (
      <ButtonsGroup
        submitText={t(
          isAccepted ? 'serviceProvider.hireNow' : 'appServiceProvider.accept',
        )}
        cancelText={t('appServiceProvider.reject').toUpperCase()}
        withHeight
        onSubmit={isAccepted ? this.handleHire : this.handleAccept}
        onCancel={this.handleReject}
        isSubmitLoading={Boolean(loadApplicationId)}
      />
    )
  }

  render() {
    const {
      navigate,
      profile,
      t,
      loadChatUsername,
      onShowAd,
      isAdsLoading,
    } = this.props
    const { isFavouriteLoading, isRequest } = this.state

    const pics = this.getPics(
      profile.picsOfWork,
      profile.certificates,
      profile.username,
    )

    return (
      <Container>
        <Header
          isFavouriteLoading={isFavouriteLoading}
          isFavourite={_.isString(profile.favouriteId)}
          isFavouriteDisable={this.isIAm}
          onOpenSidebar={navigate.showSidebar}
          onPop={navigate.pop}
          onClickShare={this.handleShareClick}
          onClickFavourite={this.handleFavouriteClick}
        >
          {this.renderHeaderProfile()}
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={isRequest}
              onRefresh={this.handleUpdate}
            />
          }
        >
          <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
          {_.isEmpty(pics) ? null : (
            <JobImagesWrapper>
              <JobImages
                data={pics}
                onClickItem={this.handleClickImage}
                onClickMore={this.handleClickImage}
              />
            </JobImagesWrapper>
          )}
          <Section minHeight={_.isString(profile.about) ? 180 : 40}>
            <AboutServiceProvider
              jobsDoneCount={profile.jobsDoneCount}
              description={profile.about}
              stars={profile.rate}
              comments={profile.reviewsCount}
              distance={profile.distance}
              onCommentsClick={this.handleOpenReviews}
            />
          </Section>

          <Section>
            <SectionTitle>{t('serviceProvider.areaIServices')}</SectionTitle>
            <ServicesWrapRowWrapper>
              <ServicesWrapRow data={profile.services} />
              <ChatWrapper>
                <IconButton
                  loading={Boolean(loadChatUsername)}
                  icon={styles.ChatIcon}
                  onClick={this.handleChatClick}
                />
              </ChatWrapper>
            </ServicesWrapRowWrapper>
          </Section>
          {_.isEmpty(profile.videoLinks) ? null : (
            <Section>
              <SectionTitle mb={0}>
                {t('serviceProvider.videoLinks')}
              </SectionTitle>
              <LinkPreview
                inputType="video"
                data={profile.videoLinks}
                toast={navigate.showMessage}
              />
            </Section>
          )}
          {_.isEmpty(profile.websiteLinks) ? null : (
            <Section>
              <SectionTitle mb={0}>
                {t('serviceProvider.websiteLinks')}
              </SectionTitle>
              <LinkPreview
                data={profile.websiteLinks}
                toast={navigate.showMessage}
              />
            </Section>
          )}
        </Content>
        {this._renderHireButton()}
        {this._renderApplicationButtons()}
      </Container>
    )
  }
}

ServiceProviderProfile.propTypes = {
  navigate: PropTypes.object,
  user: PropTypes.object,
  profile: PropTypes.object,
  onAddFavorite: PropTypes.func,
  onDeleteFavourite: PropTypes.func,
  loadHireUserId: PropTypes.string,
  onSendRequest: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  job: PropTypes.object,
  onShowPuck: PropTypes.func,
  onSPShare: PropTypes.func,
  applyApplication: PropTypes.object,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onHire: PropTypes.func,
  loadApplicationId: PropTypes.string,
  onConnectToChat: PropTypes.func,
  loadChatUsername: PropTypes.string,
  onLoadProfile: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.func,
  userId: PropTypes.string,
}

export default ServiceProviderProfile
