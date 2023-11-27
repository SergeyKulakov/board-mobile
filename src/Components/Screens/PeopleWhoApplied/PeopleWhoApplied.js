import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getCurrentService } from 'Helpers/services'
import statuses from 'Constants/statuses'
import * as routes from 'Constants/routes'
import memoize from 'memoize-one'
import { getPeopleWhoApplied } from 'Helpers/user'
import { getDataWithAds } from 'Helpers/advertising'

import { TouchableWithoutFeedback } from 'react-native'

import {
  SliderAdvertising,
  ApplyServiceProviderCard,
  Map,
  ScreenLoader,
} from 'Components/Blocks'
import { EmptyList } from 'Components/UI'
import { Header } from './innerBlocks'

import { Container, Content, CardWrapper } from './style'

class PeopleWhoApplied extends PureComponent {
  state = {
    activeTabIndex: 0,
    isRequest: false,
  }

  map = React.createRef()

  getData = memoize(getDataWithAds)

  handleChangeTabIndex = index => this.setState({ activeTabIndex: index })

  handleAccept = application => {
    const { onAccept } = this.props

    onAccept(application)
  }

  handleReject = application => {
    const { navigate, onReject } = this.props

    onReject(application, navigate.pop)
  }

  handleHire = application => {
    const { onHire, navigate } = this.props

    onHire(application, () => navigate.pop())
  }

  handleOpenProfile = application => {
    const {
      navigate,
      onLoadSPProfile,
      onShowPuck,
      getError,
      loadedSP,
      job,
      user,
    } = this.props

    const isMyJob = _.get(job, 'author.username') === user.username

    const applyApplication = isMyJob ? _.omit(application, 'user') : undefined

    if (_.get(loadedSP, 'username') === _.get(application, 'user.username')) {
      navigate.push(routes.serviceProviderProfile, { applyApplication })
    } else {
      this.setState({ isRequest: true }, () => {
        onLoadSPProfile(_.get(application, 'user.username'), ({ error }) => {
          this.setState({ isRequest: false }, () => {
            if (error) {
              onShowPuck({
                type: error,
                message: getError(error),
              })
            } else {
              navigate.push(routes.serviceProviderProfile, { applyApplication })
            }
          })
        })
      })
    }
  }

  handleHideMapSlider = () => {
    const map = this.map.current

    if (_.isFunction(map.hideSlider)) map.hideSlider()
  }

  renderMapCard = ({ item }) => {
    const { services, user, job, loadApplicationId } = this.props

    const itemServices = (item.user.services || []).map(el =>
      getCurrentService(services, el.serviceId, el.categoryId),
    )

    return (
      <TouchableWithoutFeedback onPress={() => this.handleOpenProfile(item)}>
        <ApplyServiceProviderCard
          stars={_.get(item, 'user.rate', 0)}
          avatarURL={_.get(item, 'user.avatarURL')}
          username={_.get(item, 'user.username')}
          isPro={_.get(item, 'user.isPro')}
          givenName={_.get(item, 'user.given_name', '')}
          isAccepted={item.status === statuses.accepted}
          familyName={_.get(item, 'user.family_name', '')}
          date={_.get(item, 'user.createdAt', Date.now())}
          isUserJob={user.username === _.get(job, 'author.username')}
          services={itemServices}
          isAcceptLoading={loadApplicationId === item._id}
          onAcceptClick={() => this.handleAccept(item)}
          onRejectClick={() => this.handleReject(item)}
          onHire={() => this.handleHire(item)}
          onRemoveClick={this.handleHideMapSlider}
        />
      </TouchableWithoutFeedback>
    )
  }

  renderServiceProviderCard = ({ item }) => {
    const {
      services,
      user,
      job,
      loadApplicationId,
      isAdsLoading,
      onShowAd,
    } = this.props

    if (_.isString(item)) {
      return (
        <SliderAdvertising
          type={item}
          isLoading={isAdsLoading}
          onShowAd={onShowAd}
        />
      )
    }

    if (_.isEmpty(item.user)) return null

    const itemServices = (item.user.services || []).map(el =>
      getCurrentService(services, el.serviceId, el.categoryId),
    )

    return (
      <TouchableWithoutFeedback onPress={() => this.handleOpenProfile(item)}>
        <CardWrapper>
          <ApplyServiceProviderCard
            stars={_.get(item, 'user.rate', 0)}
            avatarURL={_.get(item, 'user.avatarURL')}
            username={_.get(item, 'user.username')}
            isPro={_.get(item, 'user.isPro')}
            givenName={_.get(item, 'user.given_name', '')}
            isAccepted={item.status === statuses.accepted}
            familyName={_.get(item, 'user.family_name', '')}
            isUserJob={user.username === _.get(job, 'author.username')}
            services={itemServices}
            isAcceptLoading={loadApplicationId === item._id}
            onAcceptClick={() => this.handleAccept(item)}
            onRejectClick={() => this.handleReject(item)}
            onHire={() => this.handleHire(item)}
          />
        </CardWrapper>
      </TouchableWithoutFeedback>
    )
  }

  _renderContent = () => {
    const { job, user, loadApplicationId, onShowAd, isAdsLoading } = this.props
    const { activeTabIndex } = this.state

    const data = getPeopleWhoApplied(job, user.username)

    if (activeTabIndex === 1) {
      return (
        <Map
          data={data
            .filter(el => _.isString(el.user.geolocation))
            .map(el => ({
              ...el,
              geolocation: el.user.geolocation,
            }))}
          renderMapCard={this.renderMapCard}
          user={user}
          ref={this.map}
        />
      )
    }

    const listData = this.getData(data)

    return (
      <Content
        data={listData}
        extraData={[loadApplicationId]}
        keyExtractor={item => item._id}
        renderItem={this.renderServiceProviderCard}
        ListHeaderComponent={
          <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
        }
        ListEmptyComponent={<EmptyList />}
      />
    )
  }

  render() {
    const { navigate, job, user } = this.props
    const { activeTabIndex, isRequest } = this.state

    const data = getPeopleWhoApplied(job, user.username)

    return (
      <Container>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
          activeTabIndex={activeTabIndex}
          onChangeTabIndex={this.handleChangeTabIndex}
          peopleCount={data.length}
        />
        {this._renderContent()}
        <ScreenLoader visible={isRequest} />
      </Container>
    )
  }
}

PeopleWhoApplied.propTypes = {
  navigate: PropTypes.object,
  job: PropTypes.object,
  services: PropTypes.array,
  user: PropTypes.object,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onHire: PropTypes.func,
  loadApplicationId: PropTypes.string,
  onLoadSPProfile: PropTypes.func,
  onShowPuck: PropTypes.func,
  getError: PropTypes.func,
  loadedSP: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default PeopleWhoApplied
