import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { types } from 'Helpers/notifications'
import * as routes from 'Constants/routes'
import _ from 'lodash'
import memoize from 'memoize-one'
import { getDataWithAds } from 'Helpers/advertising'

import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SliderAdvertising, NotificationCard } from 'Components/Blocks'
import { EmptyList } from 'Components/UI'

import { Header } from './innerBlocks'

import {
  Container,
  Content,
  TopPathWrapper,
  MarkAsText,
  NotificationCardWrapper,
} from './style'

class Notifications extends Component {
  state = {
    isRefreshing: false,
    isLoadingMarkAs: false,
  }

  getNotifications = memoize(getDataWithAds)

  componentDidMount() {
    const { user, onShowPuck, t } = this.props

    if (user.settings_notif) {
      this.handleLoadNotifications()
    } else {
      onShowPuck({
        type: 'warning',
        message: t('notifications.notificationsAreDisabled'),
      })
    }
  }

  handleLoadNotifications = () => {
    const { onLoadData, onShowPuck, getError } = this.props

    this.setState({ isRefreshing: true }, () => {
      onLoadData(({ error }) => {
        this.setState({ isRefreshing: false }, () => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
            })
          }
        })
      })
    })
  }

  handleMarkAllAsRead = () => {
    const { data, onMarkAsRead, onShowPuck, getError } = this.props

    const unreadedIds = data.filter(el => !el.read).map(el => el._id)

    this.setState({ isLoadingMarkAs: true }, () => {
      onMarkAsRead(unreadedIds, ({ error }) => {
        this.setState({ isLoadingMarkAs: false }, () => {
          onShowPuck({
            type: error ? 'error' : 'success',
            message: error && getError(error),
          })
        })
      })
    })
  }

  handleClickSP = user => {
    const { navigate } = this.props
    if (_.has(user, 'username')) {
      navigate.push(routes.serviceProviderProfile, { userId: user.username })
    }
  }

  handleClickJob = job => {
    const { navigate } = this.props
    if (_.has(job, '_id')) {
      navigate.push(routes.jobDescription, { jobId: job._id })
    }
  }

  handleOpenNotificationInfo = ({ notificationType, data, _id, read }) => {
    const { navigate, onConnectToChat, onMarkAsRead } = this.props
    switch (notificationType) {
      case types.jobUnavailable:
        break
      case types.newMessage:
        onConnectToChat(data.userId)
        break
      case types.jobRequestRejected:
        navigate.push(routes.serviceProviderProfile, { userId: data.userId })
        break
      default:
        navigate.push(routes.jobDescription, { jobId: data.jobId })
    }

    if (!read) onMarkAsRead([_id])
  }

  renderTopPath = () => {
    const { data, t, onShowAd, isAdsLoading } = this.props
    const { isLoadingMarkAs } = this.state

    const isShowMarkButton = data.some(el => !el.read)

    return (
      <TopPathWrapper>
        <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
        {isShowMarkButton ? (
          <TouchableOpacity
            disabled={isLoadingMarkAs}
            onPress={this.handleMarkAllAsRead}
          >
            {isLoadingMarkAs ? (
              <ActivityIndicator />
            ) : (
              <MarkAsText>{t('notifications.markAsRead')}</MarkAsText>
            )}
          </TouchableOpacity>
        ) : null}
      </TopPathWrapper>
    )
  }

  renderItem = ({ item }) => {
    const { onShowAd, isAdsLoading } = this.props
    if (_.isString(item))
      return (
        <SliderAdvertising
          type={item}
          key={Math.random()}
          onShowAd={onShowAd}
          isLoading={isAdsLoading}
        />
      )

    return (
      <NotificationCardWrapper
        onPress={() => this.handleOpenNotificationInfo(item)}
      >
        <NotificationCard
          type={item.notificationType}
          isRead={item.read}
          date={item.createdAt}
          data={item}
          reason={item.data.reason}
          user={item.data.user}
          job={item.data.job}
          onClickUser={() => this.handleClickSP(item.data.user)}
          onClickJob={() => this.handleClickJob(item.data.job)}
        />
      </NotificationCardWrapper>
    )
  }

  render() {
    const { navigate, data, activeLanguage, isAdsLoading } = this.props
    const { isRefreshing, isLoadingMarkAs } = this.state

    const notifications = this.getNotifications(data)

    return (
      <Container>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
        />
        <Content>
          <FlatList
            extraData={[isLoadingMarkAs, activeLanguage, isAdsLoading]}
            refreshing={isRefreshing}
            onRefresh={this.handleLoadNotifications}
            keyExtractor={item => item._id}
            data={notifications}
            ListEmptyComponent={EmptyList}
            ListHeaderComponent={this.renderTopPath}
            renderItem={this.renderItem}
          />
        </Content>
      </Container>
    )
  }
}

Notifications.propTypes = {
  data: PropTypes.array,
  navigate: PropTypes.object,
  onShowPuck: PropTypes.func,
  onLoadData: PropTypes.func,
  getError: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  t: PropTypes.func,
  activeLanguage: PropTypes.string,
  onConnectToChat: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
  user: PropTypes.object,
}

export default Notifications
