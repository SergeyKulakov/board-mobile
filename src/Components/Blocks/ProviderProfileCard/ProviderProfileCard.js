import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Navigation } from 'react-native-navigation'
import { navigation } from 'Helpers/navigation'
import memoize from 'memoize-one'
import * as routes from 'Constants/routes'
import { getProfilePics } from 'Helpers/user'

import { TouchableWithoutFeedback } from 'react-native'
import { Button, IconButton, UserInfo } from 'Components/UI'
import { PicsOfWork } from './innerBlocks'

import { getText } from './config'
import {
  Container,
  AboutUs,
  CircleButtonContainer,
  ImagesContainer,
  ServicesContainer,
  ServiceText,
  SubHeaderRow,
  Footer,
  ButtonsContainer,
  HireButtonWrapper,
  styles,
} from './style'

class ProviderProfileCard extends PureComponent {
  constructor(props) {
    super(props)
    const { activeScreenName, user, data } = props
    this.state = {
      text: props.text || getText(),
      buttonWidth: 100,
    }

    this.isIAm = user.username === data.username

    Navigation.events().bindComponent(this, activeScreenName)
  }

  getPics = memoize(getProfilePics)

  componentDidAppear() {
    this._setText()
  }

  handleSetButtonWidth = node => {
    const { width } = node.nativeEvent.layout

    this.setState({ buttonWidth: Number.parseInt(width) })
  }

  handleImageClick = index => {
    const { data } = this.props

    const pics = this.getPics(data.picsOfWork, data.certificates, data.username)

    navigation.showModal(routes.imagesSlider, {
      data: pics,
      activeIndex: index,
    })
  }

  _setText = () => {
    const { text } = this.props

    this.setState({ text: text || getText() })
  }

  renderPics = () => {
    const { data } = this.props

    const pics = this.getPics(data.picsOfWork, data.certificates, data.username)

    return <PicsOfWork data={pics} onClick={this.handleImageClick} />
  }

  _renderServices = () => {
    const { data } = this.props
    const { text } = this.state

    if (_.isEmpty(data.services)) return null

    const service = text.getServiceTitle(data.services[0].title)
    const more =
      data.services.length - 1
        ? ` & ${data.services.length - 1} ${text.more}`
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

  _renderFooterButtons = () => {
    const {
      isFavouriteLoading,
      onFavouriteClick,
      onShareClick,
      data,
    } = this.props

    return (
      <>
        {this.isIAm || !_.isFunction(onFavouriteClick) ? null : (
          <CircleButtonContainer mr={10}>
            <IconButton
              icon={styles.getHeartIcon(_.isString(data.favouriteId))}
              {...styles.CircleButton}
              loading={isFavouriteLoading}
              onClick={onFavouriteClick}
            />
          </CircleButtonContainer>
        )}
        <CircleButtonContainer>
          <IconButton
            icon={styles.SharedIcon}
            {...styles.CircleButton}
            onClick={onShareClick}
          />
        </CircleButtonContainer>
      </>
    )
  }

  _renderHireButton = (isBig) => {
    const { onHireClick, user, data } = this.props
    const { text } = this.state

    if (
      !_.isObject(data) ||
      !_.isFunction(onHireClick) ||
      user.username === data.username
    )
      return null

    return (
      <HireButtonWrapper isBig={isBig} onLayout={this.handleSetButtonWidth}>
        <Button
          text={text.hireNow}
          onClick={onHireClick}
          style={styles.HireButton}
        />
      </HireButtonWrapper>
    )
  }

  render() {
    const { data, onClick, onCommentClick, isBig } = this.props
    const { buttonWidth } = this.state

    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <Container>
          <UserInfo {...data} onCommentClick={onCommentClick} />
          <SubHeaderRow>
            {this._renderServices()}
            <ButtonsContainer>{this._renderFooterButtons()}</ButtonsContainer>
          </SubHeaderRow>
          <ImagesContainer isBig={!isBig}>{this.renderPics()}</ImagesContainer>
          <Footer>
            <AboutUs maxWidth={buttonWidth}>{data.about}</AboutUs>
            {this._renderHireButton(!isBig)}
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}

ProviderProfileCard.propTypes = {
  activeScreenName: PropTypes.string, // from redux
  data: PropTypes.object.isRequired,
  text: PropTypes.shape({
    jobsMore: PropTypes.string,
    hireNow: PropTypes.string,
    more: PropTypes.string,
  }),
  user: PropTypes.object,
  orientation: PropTypes.string,
  isFavouriteLoading: PropTypes.bool,
  onImageClick: PropTypes.func,
  onFavouriteClick: PropTypes.func,
  onShareClick: PropTypes.func,
  onHireClick: PropTypes.func,
  onClick: PropTypes.func,
  onCommentClick: PropTypes.func,
}

export default ProviderProfileCard
