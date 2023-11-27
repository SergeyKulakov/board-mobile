import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Navigation } from 'react-native-navigation'
import moment from 'moment'
import { isUSA, getPeopleWhoApplied, getShortUserName } from 'Helpers/user'
import { getJobImage, getProfileAvatar } from 'Helpers/getImageUri'
import * as routes from 'Constants/routes'
import statuses from 'Constants/statuses'

import * as AddCalendarEvent from 'react-native-add-calendar-event'

import { SectionList } from 'react-native'
import {
  SliderAdvertising,
  JobImages,
  PeopleList,
  LinkPreview,
  ScreenLoader,
  DoerInfo,
} from 'Components/Blocks'
import { ShadowBox, Button, Report } from 'Components/UI'

import {
  Header,
  DescriptionBlock,
  InfoBlock,
  CustomerInfo,
} from './innerBlocks'

import { getText } from './config'
import {
  Container,
  Block,
  LinkPreviewWrapper,
  JobDescriptionWrapper,
  BookedActions,
  IconButtonsWrapper,
  BordererActionWrapper,
  CalendarIcon,
  ActionText,
  PinIcon,
  ActionsWrapper,
  ActionWrapper,
  SubmitButtonWrapper,
  ShadowButtonWrapper,
  RequestsWrapper,
  GradientContainer,
  ButtonText,
  ButtonWrapper,
  RequestLoaderWrapper,
  Loader,
  CancelButtonWrapper,
  SliderAdvertisingWrapper,
  InfoBlockWrapper,
  ButtonsWrapper,
  styles,
} from './style'

class JobDescription extends PureComponent {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)

    this.state = {
      text: getText(),
      pics: _.get(props, 'specificJob.pics', []).map(el =>
        getJobImage(props.specificJob._id, el),
      ),
      isShowAllDescription: false,
      isOpenPostedPopup: false,
      loading: {
        serviceProviderProfile: false,
        refreshing: false,
        mark: false,
      },
    }

    this.isMyJob =
      props.user.username === _.get(props, 'specificJob.author.username') ||
      props.user.username === _.get(props, 'specificJob.author')

    const jobStatus = _.get(props.specificJob, 'jobStatus')
    this.isBookedJob =
      jobStatus === statuses.booked ||
      jobStatus === statuses.completed ||
      jobStatus === statuses.done
  }

  componentDidMount() {
    const { jobId } = this.props

    if (jobId) this.handleUpdateJob(jobId)
  }

  componentDidUpdate(prevProps) {
    const { specificJob, user } = this.props
    if (!_.isEqual(prevProps.specificJob, specificJob)) {
      const jobStatus = _.get(specificJob, 'jobStatus')
      this.isBookedJob =
        jobStatus === statuses.booked ||
        jobStatus === statuses.completed ||
        jobStatus === statuses.done

      const author = _.get(specificJob, 'author') || {}

      this.isMyJob =
        user.username === author.username || user.username === author
    }
  }

  componentDidAppear() {
    this.setState({ text: getText() })
  }

  _setLoading = (key, value, callback) =>
    this.setState(
      prevState => ({ loading: { ...prevState.loading, [key]: value } }),
      callback,
    )

  openReportScreen = userId => {
    const { navigate } = this.props

    if (userId) navigate.showModal(routes.report, { userId })
  }

  handleUpdateJob = jobId => {
    const {
      navigate,
      onLoadSpecificJob,
      specificJob,
      getError,
      onShowPuck,
    } = this.props
    const {
      loading: { refreshing },
    } = this.state

    if (refreshing) return

    const requestJobId = _.isString(jobId) ? jobId : specificJob._id

    this._setLoading('refreshing', true)
    onLoadSpecificJob(requestJobId, ({ error }) => {
      this._setLoading('refreshing', false, () => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            callback: navigate.pop,
          })
        }
      })
    })
  }

  handleDescriptionPlusClick = () =>
    this.setState({ isShowAllDescription: true })

  handleShareClick = () => {
    const { specificJob, onJobShare } = this.props

    onJobShare(specificJob)
  }

  handleOpenCustomerProfile = () => {
    const { navigate, specificJob, onShowPuck, getError } = this.props

    if (_.has(specificJob, 'author.username')) {
      navigate.push(routes.serviceProviderProfile, {
        userId: specificJob.author.username,
      })
    } else {
      onShowPuck({
        type: 'error',
        message: getError('apiErrors.InternalServerError'),
      })
    }
  }

  handleImageClick = index => {
    const { navigate } = this.props
    const { pics } = this.state

    navigate.showModal(routes.imagesSlider, {
      data: pics,
      activeIndex: _.isNumber(index) ? index : 1,
    })
  }

  handleOpenServiceProviderProfile = application => {
    const { navigate, specificJob, user } = this.props
    const isMyJob = _.get(specificJob, 'author.username') === user.username

    const applyApplication = isMyJob ? _.omit(application, 'user') : undefined

    if (
      !_.isObject(application.user) ||
      _.isEmpty(application.user) ||
      !_.has(application.user, 'username')
    )
      return null

    navigate.push(routes.serviceProviderProfile, {
      applyApplication,
      userId: application.userId,
    })
  }

  handleClickChat = () => {
    const { user, specificJob, onConnectToChat } = this.props

    let partner = _.get(specificJob, 'author.username')

    if (partner === user.username) partner = _.get(specificJob, 'doer')

    if (partner) onConnectToChat(partner, { fromJob: true })
  }

  handleOpenPeopleWhoApplied = () => {
    const { navigate } = this.props

    navigate.push(routes.seePeopleWhoApplied)
  }

  handleMarAsClick = () => {
    const { specificJob, onMarkAsJob, navigate, getError } = this.props

    this._setLoading('mark', true)
    onMarkAsJob(specificJob._id, ({ error }) => {
      this._setLoading('mark', false)
      if (error) navigate.showMessage(getError(error))
    })
  }

  handleAddCalendarEvent = async () => {
    const { specificJob, onShowPuck, user } = this.props

    try {
      const response = await AddCalendarEvent.presentEventCreatingDialog({
        title: `SpotJobs ${specificJob.title} ${moment(
          specificJob.startDate,
        ).format(`DD MMM YYYY ${isUSA(user) ? 'hh:mmA' : 'HH:mm'}`)}`,
        location: specificJob.streetAddress,
        allDay: true,
      })

      if (response.action === 'SAVED') onShowPuck({ delay: 2000 })
    } catch (err) {
      if (err.action !== 'CANCELED') onShowPuck({ type: 'error' })
    }
  }

  handleApplyForAJob = () => {
    const { onApplyJob, specificJob } = this.props

    onApplyJob(specificJob, this.handleUpdateJob)
  }

  handleOpenMap = () => {
    const { navigate } = this.props

    navigate.showModal(routes.mapModal)
  }

  handleRejectRequest = () => {
    const { navigate, specificJob, onRejectRequest } = this.props

    const request = _.get(specificJob, 'jobRequests[0]')

    onRejectRequest(request, navigate.pop)
  }

  handleAcceptRequest = () => {
    const { navigate, specificJob, onAcceptRequest } = this.props

    const request = _.get(specificJob, 'jobRequests[0]')

    onAcceptRequest(request, error => {
      if (!error) navigate.pop()
    })
  }

  handleCancelClick = () => {
    const { navigate, onShowPuck, specificJob, onCancelJob } = this.props

    onCancelJob(specificJob, () => {
      onShowPuck()
      setTimeout(navigate.pop, 1000)
    })
  }

  handleEditJob = () => {
    const { navigate } = this.props

    navigate.push(routes.postJob, { isEditMode: true })
  }

  handleDeleteJob = () => {
    const { navigate, specificJob, onRemoveJob } = this.props
    onRemoveJob(specificJob._id)
    navigate.pop()
  }

  handleOpenPostedActions = () =>
    this.setState(prevState => ({
      isOpenPostedPopup: !prevState.isOpenPostedPopup,
    }))

  handleShowDoerProfile = () => {
    const {
      navigate,
      onShowPuck,
      specificJob,
      onLoadServiceProviderProfile,
      serviceProviderProfile,
      getError,
    } = this.props

    if (_.get(serviceProviderProfile, 'username') === specificJob.doer) {
      navigate.push(routes.serviceProviderProfile)
    } else {
      this._setLoading('serviceProviderProfile', true)
      onLoadServiceProviderProfile(specificJob.doer, ({ error }) => {
        this._setLoading('serviceProviderProfile', false, () => {
          if (error) onShowPuck({ type: 'error', message: getError(error) })
          else navigate.push(routes.serviceProviderProfile)
        })
      })
    }
  }

  handleOpenOtherAuthorJobs = () => {
    const { specificJob, navigate } = this.props

    const author = _.get(specificJob, 'author.username')

    if (author)
      navigate.push(routes.findJobs, {
        author,
      })
  }

  handleOpenReviews = ({ userId }) => {
    const { specificJob, navigate } = this.props

    const author = userId || _.get(specificJob, 'author.username')

    if (author) {
      navigate.push(routes.reviews, {
        userId: author,
      })
    }
  }

  handleOpenDoerReviews = () => {
    const { specificJob } = this.props

    this.handleOpenReviews({ userId: specificJob.doer })
  }

  handleSendReport = () => {
    const { specificJob } = this.props

    const author = _.get(specificJob, 'author.username')
    this.openReportScreen(author)
  }

  handleSendDoerReport = () => {
    const { specificJob } = this.props

    const userId = specificJob.doer

    this.openReportScreen(userId)
  }

  handleSendReview = () => {
    const { navigate, specificJob, user } = this.props

    const review = (specificJob.review || []).find(
      el =>
        el.author === user.username &&
        el.jobId === specificJob._id &&
        el.reviewedUserId === specificJob.doer,
    )

    navigate.push(routes.ratingReview, { review })
  }

  renderInfoBlock = () => {
    const { specificJob, user, loadChatUsername } = this.props

    if (_.isEmpty(specificJob)) return null

    const isShowAddress =
      specificJob.jobStatus === statuses.booked ||
      specificJob.jobStatus === statuses.completed ||
      specificJob.jobStatus === statuses.done

    const author = _.get(specificJob, 'author.username')

    const request = _.get(specificJob, 'jobRequests[0]')

    let isShowChat = false

    if (
      specificJob.jobStatus === 'booked' || specificJob.applicationId ||
      _.get(specificJob, 'peopleWhoApplied', []).some(
        el => el.userId === user.username,
      ) ||
      request
    ) {
      if (
        _.get(specificJob, 'author.username') !== user.username ||
        specificJob.jobStatus !== 'completed' ||
        specificJob.jobStatus !== 'done'
      ) {
        isShowChat = true
      }
    }

    return (
      <InfoBlockWrapper isLong={isShowAddress}>
        <InfoBlock
          isShowAddress={isShowAddress}
          category={_.get(specificJob, 'category.title')}
          subCategory={_.get(specificJob, 'service.title')}
          createdDate={specificJob.createdAt}
          address={specificJob.streetAddress}
          city={specificJob.city}
          state={specificJob.state}
          country={specificJob.country}
          zipCode={specificJob.zipCode}
          jobId={specificJob._id}
          isChatLoading={Boolean(loadChatUsername)}
          // isShowChat={
          //   author !== user.username ||
          //   specificJob.jobStatus === statuses.booked ||
          //   specificJob.jobStatus === statuses.completed ||
          //   specificJob.jobStatus === statuses.done
          // }
          isShowChat={isShowChat}
          onClickChat={this.handleClickChat}
          onClickSeeMap={this.handleOpenMap}
        />
      </InfoBlockWrapper>
    )
  }

  renderReport = () => {
    const { specificJob, user } = this.props

    const author = _.get(specificJob, 'author')

    if (!author || _.get(author, 'username') === user.username) return null

    const shortName = getShortUserName(
      author.given_name,
      author.family_name,
      author.username,
    )

    return <Report onClick={this.handleSendReport}>{shortName}</Report>
  }

  renderApplyButton = () => {
    const { specificJob, user } = this.props
    const { text, loading } = this.state

    if (_.isEmpty(specificJob)) return null

    const request = _.get(specificJob, 'jobRequests[0]')

    const isApplied = (specificJob.peopleWhoApplied || []).find(
      el => el.userId === user.username,
    )

    if (
      !this.isMyJob &&
      !specificJob.isApplied &&
      !isApplied &&
      specificJob.jobStatus === statuses.posted &&
      !loading.refreshing &&
      !_.isObject(request) &&
      !specificJob.applicationId
    ) {
      return (
        <Button linear text={text.apply} onClick={this.handleApplyForAJob} />
      )
    }

    return null
  }

  renderMyBookedJobButtons = () => {
    const { specificJob, navigate, onStartTracking, user } = this.props
    const { text, loading } = this.state

    const request = _.get(specificJob, 'jobRequests[0]')

    const isMyBookedJob =
      _.get(specificJob, 'author.username') === user.username ||
      specificJob.doer === user.username

    if (_.isObject(request) || _.isEmpty(specificJob) || !isMyBookedJob)
      return null

    if (
      specificJob.jobStatus === statuses.booked ||
      specificJob.jobStatus === statuses.done ||
      specificJob.jobStatus === statuses.completed
    ) {
      const disableCalendar = specificJob.jobStatus !== statuses.booked
      const disabledComplete =
        specificJob.jobStatus === statuses.done ||
        (!this.isMyJob && specificJob.jobStatus === statuses.completed)
      const disabledReview =
        (this.isMyJob &&
          specificJob.review.some(
            el => el.reviewedUserId === specificJob.doer,
          )) ||
        (!this.isMyJob &&
          specificJob.review.some(
            el => el.reviewedUserId === _.get(specificJob, 'author.username'),
          ))

      return (
        <BookedActions>
          <IconButtonsWrapper>
            <BordererActionWrapper
              disabled={disableCalendar}
              onPress={this.handleAddCalendarEvent}
            >
              <>
                <CalendarIcon />
                <ActionText>{text.addToGoogle}</ActionText>
              </>
            </BordererActionWrapper>
            <ActionWrapper onPress={() => onStartTracking(specificJob)}>
              <>
                <PinIcon />
                <ActionText>{text.liveTrack}</ActionText>
              </>
            </ActionWrapper>
          </IconButtonsWrapper>
          <ActionsWrapper>
            <ShadowButtonWrapper>
              <SubmitButtonWrapper>
                <Button
                  style={styles.Button}
                  onClick={this.handleMarAsClick}
                  loading={loading.mark}
                  type={
                    disabledReview || disabledComplete ? 'color' : 'gradient'
                  }
                  disabled={disabledReview || disabledComplete}
                >
                  {this.isMyJob ? text.markAsDone : text.markAsCompleted}
                </Button>
              </SubmitButtonWrapper>
            </ShadowButtonWrapper>

            <ShadowButtonWrapper>
              <Button
                style={styles.RateButton}
                type={disabledComplete ? 'gradient' : 'color'}
                disabled={!disabledComplete}
                onClick={this.handleSendReview}
              >
                {text.rateReview}
              </Button>
            </ShadowButtonWrapper>
          </ActionsWrapper>
        </BookedActions>
      )
    }

    return null
  }

  renderRequestsButtons = () => {
    const { specificJob, t, loadRequestId } = this.props

    const request = _.get(specificJob, 'jobRequests[0]')

    if (!_.isObject(request)) return null

    return loadRequestId ? (
      <RequestLoaderWrapper>
        <Loader />
      </RequestLoaderWrapper>
    ) : (
      <RequestsWrapper>
        <ButtonWrapper onPress={this.handleRejectRequest}>
          <GradientContainer isRed>
            <ButtonText>{t('serviceProvider.reject')}</ButtonText>
          </GradientContainer>
        </ButtonWrapper>
        <ButtonWrapper onPress={this.handleAcceptRequest}>
          <GradientContainer>
            <ButtonText>{t('serviceProvider.accept')}</ButtonText>
          </GradientContainer>
        </ButtonWrapper>
      </RequestsWrapper>
    )
  }

  renderCancelButton = () => {
    const { specificJob, t, user } = this.props

    const isMyBookedJob =
      _.get(specificJob, 'author.username') === user.username ||
      specificJob.doer === user.username

    if (_.isEmpty(specificJob)) return null

    if (
      specificJob.jobStatus === statuses.completed ||
      specificJob.jobStatus === statuses.done ||
      (specificJob.jobStatus === statuses.booked && !isMyBookedJob)
    ) {
      return null
    }

    if (
      (specificJob.peopleWhoApplied || []).some(
        el => el.userId === user.username,
      ) ||
      specificJob.jobStatus === statuses.booked
    ) {
      return (
        <CancelButtonWrapper>
          <Button {...styles.CancelButton} onClick={this.handleCancelClick}>
            {t('LeftoverOnes.cancelJob')}
          </Button>
        </CancelButtonWrapper>
      )
    }

    return null
  }

  renderButtons = () => (
    <ButtonsWrapper>
      {this.renderMyBookedJobButtons()}
      {this.renderCancelButton()}
      {this.renderRequestsButtons()}
      {this.renderApplyButton()}
    </ButtonsWrapper>
  )

  render() {
    const {
      navigate,
      specificJob,
      onFavouriteClick,
      loadingJobId,
      user,
      onShowAd,
      isAdsLoading,
    } = this.props
    const {
      pics,
      text,
      isShowAllDescription,
      loading,
      isOpenPostedPopup,
    } = this.state

    if (_.isEmpty(specificJob) && !loading.refreshing) return null
    else if (_.isEmpty(specificJob) && loading.refreshing)
      return <ScreenLoader />

    const isHideFavouriteButton =
      user.username === _.get(specificJob, 'author.username') ||
      (user.username === _.get(specificJob, 'author.username') &&
        specificJob.jobStatus === statuses.posted) ||
      specificJob.jobStatus === statuses.canceled

    const isJobIsBooked =
      specificJob.jobStatus === statuses.booked ||
      specificJob.jobStatus === statuses.completed ||
      specificJob.jobStatus === statuses.done

    const peopleWhoApplied = getPeopleWhoApplied(specificJob, user.username)

    return (
      <Container>
        <Header
          title={specificJob.title}
          appliedBy={_.get(specificJob, 'peopleWhoApplied.length')}
          isPremium={specificJob.isPremium}
          isBookedJob={this.isBookedJob}
          isFavourite={_.isString(specificJob.favouriteId)}
          isFavouriteLoading={Boolean(loadingJobId)}
          isFavouriteDisable={this.isMyJob}
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
          onFavouriteClick={
            isHideFavouriteButton ? null : () => onFavouriteClick(specificJob)
          }
          isShowPostedActions={
            this.isMyJob && specificJob.jobStatus === statuses.posted
          }
          onShareClick={this.handleShareClick}
          onEditClick={this.handleEditJob}
          onDeleteClick={this.handleDeleteJob}
          isOpenPostedPopup={isOpenPostedPopup}
          onOpenPostedActions={this.handleOpenPostedActions}
        />
        <SectionList
          refreshing={loading.refreshing}
          onRefresh={this.handleUpdateJob}
          extraData={[loading.refreshing]}
          sections={[
            {
              key: 'ads',
              data: [' '],
              renderItem: () => (
                <SliderAdvertising
                  isLoading={isAdsLoading}
                  onShowAd={onShowAd}
                />
              ),
            },
            {
              key: 'pics',
              data: [' '],
              renderItem: () =>
                _.isEmpty(pics) ? null : (
                  <Block mb={2}>
                    <ShadowBox style={styles.ImagesContainer}>
                      <JobImages
                        data={pics}
                        onClickItem={this.handleImageClick}
                        onClickMore={this.handleImageClick}
                      />
                    </ShadowBox>
                  </Block>
                ),
            },
            {
              key: 'description',
              data: [' '],
              renderItem: () =>
                loading.refreshing ? null : (
                  <Block mb={2}>
                    <JobDescriptionWrapper isLong={specificJob.description}>
                      <DescriptionBlock
                        jobTitle={specificJob.title}
                        startDate={specificJob.startDate}
                        isShowStarDate={isJobIsBooked}
                        doneBefore={specificJob.doneBefore}
                        description={specificJob.description}
                        budget={specificJob.budget}
                        currency={specificJob.currency}
                        distance={specificJob.distance}
                        isShowAllDescription={isShowAllDescription}
                        onShowAllDescription={this.handleDescriptionPlusClick}
                      />
                    </JobDescriptionWrapper>
                  </Block>
                ),
            },
            {
              key: 'videoLinks',
              data: [' '],
              renderItem: () =>
                _.isEmpty(specificJob.videoLinks) ? null : (
                  <Block mb={2}>
                    <LinkPreviewWrapper>
                      <LinkPreview
                        data={specificJob.videoLinks}
                        toast={navigate.showMessage}
                        inputType="video"
                      />
                    </LinkPreviewWrapper>
                  </Block>
                ),
            },
            {
              key: 'infoBlock',
              data: [' '],
              renderItem: () => (
                <Block mb={specificJob.author ? 2 : 0}>
                  <ShadowBox style={styles.ShadowBox}>
                    {this.renderInfoBlock()}
                  </ShadowBox>
                </Block>
              ),
            },
            {
              key: 'customerInfo',
              data: [' '],
              renderItem: () =>
                _.isObject(specificJob.author) ? (
                  <Block mb={2}>
                    <ShadowBox
                      style={{ ...styles.ShadowBox, ...styles.CustomerInfo }}
                    >
                      <CustomerInfo
                        text={text.CustomerInfo}
                        isPremium={specificJob.author.isPremium}
                        avatar={
                          _.isObject(specificJob.author)
                            ? getProfileAvatar(
                                _.get(specificJob, 'author.avatarURL'),
                                _.get(specificJob, 'author.username'),
                              )
                            : null
                        }
                        familyName={_.get(specificJob, 'author.family_name')}
                        givenName={_.get(specificJob, 'author.given_name')}
                        reviewCount={_.get(specificJob, 'author.reviewCount')}
                        stars={_.get(specificJob, 'author.stars')}
                        userName={_.get(specificJob, 'author.username')}
                        onClick={this.handleOpenCustomerProfile}
                        onClickOtherPosted={this.handleOpenOtherAuthorJobs}
                        onClickReviews={this.handleOpenReviews}
                      />
                    </ShadowBox>
                  </Block>
                ) : null,
            },
            {
              key: 'peopleWhoApplied',
              data: [' '],
              renderItem: () =>
                !_.isEmpty(peopleWhoApplied) &&
                (specificJob.jobStatus === statuses.posted ||
                  specificJob.jobStatus === statuses.applied) ? (
                  <Block mb={2} mt={1} minHeigth={100}>
                    <ShadowBox style={styles.PeopleList}>
                      <PeopleList
                        onClickItem={this.handleOpenServiceProviderProfile}
                        data={peopleWhoApplied}
                        text={text.PeopleList}
                        userObjKey="user"
                        onClickHeaderLink={this.handleOpenPeopleWhoApplied}
                      />
                    </ShadowBox>
                  </Block>
                ) : null,
            },
            {
              key: 'report',
              data: [' '],
              renderItem: this.renderReport,
            },
            {
              key: 'doerInfo',
              data: [' '],
              renderItem: () =>
                specificJob.jobStatus === statuses.posted ? null : (
                  <DoerInfo
                    doerId={specificJob.doer}
                    onClick={this.handleShowDoerProfile}
                    onReviewsClick={this.handleOpenDoerReviews}
                    onClickReport={this.handleSendDoerReport}
                  />
                ),
            },
            {
              key: 'buttons',
              data: [' '],
              renderItem: this.renderButtons,
            },
            {
              key: 'ads2',
              data: [' '],
              renderItem: () => (
                <SliderAdvertisingWrapper>
                  <SliderAdvertising
                    isLoading={isAdsLoading}
                    onShowAd={onShowAd}
                  />
                </SliderAdvertisingWrapper>
              ),
            },
          ]}
        />
        <ScreenLoader visible={loading.serviceProviderProfile} />
      </Container>
    )
  }
}

JobDescription.propTypes = {
  getError: PropTypes.func,
  loadApplyJobId: PropTypes.string,
  loadRequestId: PropTypes.string,
  loadingJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  navigate: PropTypes.object.isRequired,
  serviceProviderProfile: PropTypes.object,
  specificJob: PropTypes.object,
  t: PropTypes.func,
  jobId: PropTypes.string,
  user: PropTypes.object.isRequired,
  onAcceptRequest: PropTypes.func,
  onApplyJob: PropTypes.func,
  onCancelJob: PropTypes.func,
  onFavouriteClick: PropTypes.func,
  onJobShare: PropTypes.func,
  onLoadServiceProviderProfile: PropTypes.func,
  onLoadSpecificJob: PropTypes.func.isRequired,
  onMarkAsJob: PropTypes.func,
  onRejectRequest: PropTypes.func,
  onRemoveJob: PropTypes.func,
  onShowPuck: PropTypes.func,
  loadChatUsername: PropTypes.string,
  onConnectToChat: PropTypes.func,
  onSubscribeTrack: PropTypes.func,
  onStartTracking: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default JobDescription
