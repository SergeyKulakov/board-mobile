import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getJobImage } from 'Helpers/getImageUri'
import i18n from 'I18N'
import _ from 'lodash'
import moment from 'moment'
import statuses from 'Constants/statuses'

import { TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  Button,
  DistanceIcon,
  Icon,
  CrownIcon,
  MoreIcon,
  Image,
  IconButton,
  Dialog,
} from 'Components/UI'

import {
  Container,
  Title,
  TitleContainer,
  Header,
  Row,
  Content,
  ImageContainer,
  DateText,
  Description,
  InfoBlock,
  BudgetText,
  BudgetContainer,
  DistanceContainer,
  BottomContainer,
  DistanceBlock,
  RightHeaderBlock,
  HeartIcon,
  Footer,
  RemoveIcon,
  MoreWrapper,
  CancelButton,
  CircleButtonContainer,
  styles,
} from './style'

class JobCard extends PureComponent {
  state = {
    buttonWidth: 100,
  }

  handleSetButtonWidth = node => {
    const { width } = node.nativeEvent.layout

    this.setState({ buttonWidth: Number.parseInt(width) })
  }

  renderApplyButton = () => {
    const { onButtonClick, applicationId } = this.props

    if (_.isFunction(onButtonClick) && !_.isString(applicationId)) {
      return (
        <Button
          text={i18n.t('findJobPage.apply')}
          style={styles.Button}
          onClick={onButtonClick}
        />
      )
    }
    return null
  }

  renderSelectButton = () => {
    const { onSelectClick, t } = this.props

    if (_.isFunction(onSelectClick)) {
      return (
        <Button style={styles.Button} onClick={onSelectClick}>
          {t('LeftoverOnes.selectJob')}
        </Button>
      )
    }
    return null
  }

  renderFavouriteShareButtons = () => {
    const {
      onFavouriteClick,
      onShareClick,
      isFavouriteLoading,
      favouriteId,
    } = this.props

    return (
      <>
        {_.isFunction(onFavouriteClick) ? (
          <CircleButtonContainer isLarge onPress={onFavouriteClick}>
            <IconButton
              icon={styles.getHeartIcon(_.isString(favouriteId))}
              {...styles.CircleButton}
              loading={isFavouriteLoading}
              onClick={onFavouriteClick}
            />
          </CircleButtonContainer>
        ) : null}

        {_.isFunction(onShareClick) ? (
          <CircleButtonContainer onPress={onShareClick}>
            <IconButton
              icon={styles.SharedIcon}
              {...styles.CircleButton}
              onClick={onShareClick}
            />
          </CircleButtonContainer>
        ) : null}
      </>
    )
  }

  renderSmallFavouriteIcon = () => {
    const { favouriteId, onFavouriteClick } = this.props

    if (_.isString(favouriteId) && !_.isFunction(onFavouriteClick)) {
      return (
        <HeartIcon>
          <Icon {...styles.HeartIcon} />
        </HeartIcon>
      )
    }

    return null
  }

  renderRemoveButton = () => {
    const { onRemoveClick } = this.props

    if (_.isFunction(onRemoveClick)) {
      return <RemoveIcon onClick={onRemoveClick} />
    }

    return null
  }

  renderPostedJobPopup = () => {
    const { onEdit, onDelete, isShowDialog, onClickMore } = this.props

    if (
      _.isFunction(onEdit) &&
      _.isFunction(onDelete) &&
      _.isFunction(onClickMore)
    ) {
      return (
        <MoreWrapper>
          <MoreIcon onClick={onClickMore} />

          <Dialog
            onEdit={onEdit}
            onDelete={onDelete}
            onClose={onClickMore}
            isVisible={isShowDialog}
          />
        </MoreWrapper>
      )
    }

    return null
  }

  renderCanceledButton = () => {
    const { onCancelClick, jobStatus, t, application } = this.props

    if (
      _.isFunction(onCancelClick) &&
      (jobStatus === statuses.booked ||
        (_.get(application, 'status') === statuses.applied ||
          _.get(application, 'status') === statuses.accepted))
    ) {
      return (
        <TouchableOpacity onPress={onCancelClick}>
          <CancelButton>{t('LeftoverOnes.cancelJob')}</CancelButton>
        </TouchableOpacity>
      )
    }

    return null
  }

  renderTrackButton = () => {
    const { onTrackClick, t } = this.props

    if (_.isFunction(onTrackClick)) {
      return (
        <Button style={styles.Button} onClick={onTrackClick}>
          {t('landingPage.trackNow')}
        </Button>
      )
    }

    return null
  }

  render() {
    const {
      _id,
      title,
      isPremium,
      pics,
      description,
      distance,
      doneBefore,
      startDate,
      budget,
      currency,
      t,
      jobStatus,
    } = this.props
    const { buttonWidth } = this.state

    const isBookedJob =
      jobStatus === statuses.booked ||
      jobStatus === statuses.completed ||
      jobStatus === statuses.done

    const date = isBookedJob && startDate ? startDate : doneBefore

    const dateText = `${t(
      isBookedJob ? 'myJobsDetail.apptOn' : 'findJobPage.before',
    )} ${moment(date).format('DD MMM YYYY')}`

    return (
      <Container>
        <Header>
          <TitleContainer>
            <Title maxWidth={buttonWidth}>{title}</Title>
            {isPremium ? <CrownIcon /> : null}
          </TitleContainer>
          <RightHeaderBlock onLayout={this.handleSetButtonWidth}>
            {this.renderApplyButton()}
            {this.renderSelectButton()}
            {this.renderTrackButton()}
            {this.renderFavouriteShareButtons()}
            {this.renderPostedJobPopup()}
            {this.renderCanceledButton()}
            {this.renderSmallFavouriteIcon()}
            {this.renderRemoveButton()}
          </RightHeaderBlock>
        </Header>
        <Content>
          <Row>
            <ImageContainer>
              {_.isEmpty(pics) ? (
                <Icon {...styles.JobDefaultIcon} />
              ) : (
                <Image data={getJobImage(_id, pics[0])} {...styles.Image} />
              )}
            </ImageContainer>
            <InfoBlock>
              <Description>{description}</Description>
              <Row alignStart>
                <Icon {...styles.CalendarIcon} />
                <DateText>{dateText}</DateText>
              </Row>
            </InfoBlock>
          </Row>
        </Content>
        <Footer>
          <LinearGradient {...styles.BudgetGradient}>
            <BottomContainer>
              <DistanceContainer>
                {_.isEmpty(distance) ? null : (
                  <LinearGradient {...styles.DistanceGradient}>
                    <DistanceBlock>
                      <DistanceIcon
                        value={distance.length}
                        units={distance.units}
                        {...styles.DistanceIcon}
                      />
                    </DistanceBlock>
                  </LinearGradient>
                )}
              </DistanceContainer>
              <BudgetContainer>
                <BudgetText>{`${i18n.t('findJobPage.budget')}: ${budget} ${
                  _.isString(currency) ? currency : ''
                }`}</BudgetText>
              </BudgetContainer>
            </BottomContainer>
          </LinearGradient>
        </Footer>
      </Container>
    )
  }
}

JobCard.propTypes = {
  _id: PropTypes.string.isRequired,
  budget: PropTypes.number,
  currency: PropTypes.string,
  description: PropTypes.string,
  distance: PropTypes.shape({
    lengthM: PropTypes.number,
    length: PropTypes.number,
    units: PropTypes.string,
  }),
  doneBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  favouriteId: PropTypes.string,
  isPremium: PropTypes.bool,
  onButtonClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onRemoveClick: PropTypes.func,
  pics: PropTypes.array,
  title: PropTypes.string,
  isShowDialog: PropTypes.bool,
  onClickMore: PropTypes.func,
  onCancelClick: PropTypes.func,
  jobStatus: PropTypes.string,
  applicationId: PropTypes.string,
  onSelectClick: PropTypes.func,
  isFavouriteLoading: PropTypes.bool,
  onFavouriteClick: PropTypes.func,
  onShareClick: PropTypes.func,
  t: PropTypes.func,
  application: PropTypes.object,
}

export default JobCard
