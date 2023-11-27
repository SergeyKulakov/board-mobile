import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { isIos } from 'Helpers/iphoneX'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SliderAdvertising, ScreenLoader } from 'Components/Blocks'
import { ProviderPhoto, RatingSlider, InputBlock, Button } from 'Components/UI'

import { Header } from './innerBlocks'

import {
  Container,
  ProfileName,
  RateWrapper,
  Section,
  ProviderPhotoWrapper,
  RatingSliderWrapper,
  FeedbackWrapper,
  Label,
  InputBlockWrapper,
  ButtonWrapper,
} from './style'

class RateReview extends PureComponent {
  constructor(props) {
    super(props)

    const { review } = props

    this.state = {
      feedback: _.get(review, 'comment', ''),
      rate: _.get(review, 'rate', 0),
      isRequest: true,
      isSubmitLoad: false,
    }
  }

  componentDidMount() {
    this.loadSP()
  }

  loadSP = () => {
    const { onLoadSP, job, navigate, getError, user, review } = this.props

    let request

    if (_.has(review, 'reviewedUserId')) request = review.reviewedUserId
    else if (!_.isEmpty(job)) {
      request =
        job.doer === user.username ? _.get(job, 'author.username') : job.doer
    }

    this.setState({ isRequest: true })
    onLoadSP(request, ({ error }) => {
      this.setState({ isRequest: false })
      if (error) navigate.showMessage(getError(error))
    })
  }

  handleChangeFeedback = feedback => this.setState({ feedback })

  handleChangeRate = rate => this.setState({ rate })

  handleSubmit = () => {
    const {
      job,
      onSubmit,
      navigate,
      serviceProvider,
      getError,
      review,
      onUpdate,
      onShowPuck,
    } = this.props
    const { feedback, rate } = this.state

    this.setState({ isSubmitLoad: true })
    if (_.has(review, '_id')) {
      const request = {
        reviewId: review._id,
        jobId: review.jobId,
        reviewedUserId: review.reviewedUserId,
        rate,
        comment: feedback,
      }

      onUpdate(request, ({ error }) => {
        this.setState({ isSubmitLoad: false })
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        } else {
          onShowPuck({ callback: navigate.pop })
        }
      })
    } else {
      const request = {
        jobId: job._id,
        reviewedUserId: serviceProvider.username,
        rate,
        comment: feedback,
      }

      onSubmit(request, ({ error }) => {
        this.setState({ isSubmitLoad: false })
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        } else onShowPuck({ callback: navigate.pop })
      })
    }
  }

  _renderProfilePhoto = () => {
    const { serviceProvider } = this.props
    const { isRequest } = this.state

    return (
      <ProviderPhotoWrapper>
        {isRequest ? null : (
          <ProviderPhoto
            avatarURL={_.get(serviceProvider, 'avatarURL')}
            username={_.get(serviceProvider, 'username')}
            isCheck={_.get(serviceProvider, 'idVerified')}
          />
        )}
      </ProviderPhotoWrapper>
    )
  }

  render() {
    const {
      navigate,
      serviceProvider,
      t,
      onShowAd,
      isAdsLoading,
      review,
    } = this.props
    const { isRequest, rate, feedback, isSubmitLoad } = this.state

    return (
      <Container>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
        />
        <KeyboardAwareScrollView>
          <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
          {!isIos() ? this._renderProfilePhoto() : null}
          <RateWrapper>
            {isIos() ? this._renderProfilePhoto() : null}
            <Section>
              <ProfileName>
                {_.get(serviceProvider, 'given_name')}{' '}
                {_.get(serviceProvider, 'family_name')}
              </ProfileName>
              <RatingSliderWrapper>
                <RatingSlider value={rate} onChange={this.handleChangeRate} />
              </RatingSliderWrapper>
            </Section>
          </RateWrapper>
          <FeedbackWrapper>
            <Label>{t('rating.giveYourFeedback')}</Label>
            <InputBlockWrapper>
              <InputBlock
                value={feedback}
                onChange={this.handleChangeFeedback}
                animatedLine
                autoHeight
                multiline
                placeholder={t('deleteAccountScreen.typeHere')}
              />
            </InputBlockWrapper>
          </FeedbackWrapper>
          <ButtonWrapper>
            <Button onClick={this.handleSubmit} loading={isSubmitLoad}>
              {t('sign.submit')}
            </Button>
          </ButtonWrapper>
          <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
        </KeyboardAwareScrollView>
        <ScreenLoader visible={isRequest} />
      </Container>
    )
  }
}

RateReview.propTypes = {
  navigate: PropTypes.object,
  job: PropTypes.object,
  onLoadSP: PropTypes.func,
  serviceProvider: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  user: PropTypes.object,
  review: PropTypes.object,
  onUpdate: PropTypes.func,
  onShowPuck: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.func,
}

export default RateReview
