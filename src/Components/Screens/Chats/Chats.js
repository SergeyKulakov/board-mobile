import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import _ from 'lodash'
import moment from 'moment'
import { getDataWithAds } from 'Helpers/advertising'

import { SwipeListView } from 'react-native-swipe-list-view'
import { SliderAdvertising, ChatCard } from 'Components/Blocks'
import { EmptyList } from 'Components/UI'
import { ActivityIndicator } from 'react-native'
import { blockChatConst, unblockChatConst } from 'Constants/chats'

import { Header } from './innerBlocks'

import {
  Container,
  Content,
  ChatCardWrapper,
  ActionsWrapper,
  BlockWrapper,
  GradientActionWrapper,
  ActionIcon,
  ActionText,
  ActivityIndicatorWrapper,
  EmptyView,
} from './style'
import { swipeListProps } from './config'

class Chats extends PureComponent {
  state = {
    search: [''],
    isRequest: false,
  }

  getSearchProps = memoize((t, value) => ({
    value,
    placeholder: t('common.searchPerson'),
    onChange: this.handleSearchFieldChange,
  }))

  // getChatsData = memoize(getDataWithAds)

  componentDidMount() {
    this.handleLoadChats()
  }

  getChatsData = data => {
    const { search } = this.state
    let options = []
    if (!_.isEmpty(data)) {
      data.filter(el => {
        const { family_name, given_name } = el.partner
        options = ['']
        if (search.join('')) {
          const parNameArray = [given_name, family_name, el.jobTitle]
          const searchPattern = new RegExp(
            search.map(term => `(?=.*${term})`).join(''),
            'i',
          )
          options = parNameArray.filter(option => option.match(searchPattern))
        } else {
          options = []
        }
      })
    }

    if (!options.join('') && search.join('')) {
      return
    }

    return getDataWithAds(data)
  }

  handleLoadChats = () => {
    const { onLoadChats, onShowPuck, getError } = this.props

    this.setState({ isRequest: true }, () => {
      onLoadChats(({ error }) => {
        this.setState({ isRequest: false }, () => {
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

  handleSearchFieldChange = value => {
    this.setState({ search: value.split(' ') })
  }

  handleOpenChat = chat => {
    const { onConnectToChat, user, onShowPuck } = this.props
    const { isRequest } = this.state

    if (isRequest) return

    const partnerId = chat.users.find(el => el !== user.username)

    // if (!_.isEmpty(chat)) {
    //   if (chat.blockedBy !== 'disabled' && !!chat.blockedBy) {
    //     return null
    //   }
    // }

    if (!_.isEmpty(chat)) {
      if (chat.blockedBy !== 'disabled' && !!chat.blockedBy) {
        onShowPuck({
          type: 'error',
          message:
            'This chat is blocked, remove restriction to resume the chat.',
        })
      }
    }

    if (partnerId) onConnectToChat(partnerId)
  }

  handleLockChat = (chat, rowMap) => {
    const { onInvokeChatAction } = this.props

    onInvokeChatAction(chat, () => {
      rowMap[chat._id].closeRow()
      this.handleLoadChats()
    })
  }

  renderChatCard = ({ item }) => {
    const {
      loadChatUsername,
      isAdsLoading,
      onShowAd,
      onLoadChats,
      onShowPuck,
      getError,
    } = this.props
    const { search } = this.state

    if (!_.isEmpty(item.messages)) {
      if (
        item.messages[0].text === blockChatConst ||
        item.messages[0].text === unblockChatConst
      ) {
        this.handleLoadChats()
      }
    }
    
    if (_.isString(item)) {
      return (
        <SliderAdvertising
          type={item}
          isLoading={isAdsLoading}
          onShowAd={onShowAd}
        />
      )
    }

    return (
      <ChatCardWrapper onPress={() => this.handleOpenChat(item)}>
        <ChatCard
          isChatBlocked={item.blockedBy !== 'disabled' && !!item.blockedBy}
          {...item}
          isLoading={loadChatUsername === _.get(item, 'partner.username')}
        />
      </ChatCardWrapper>
    )
  }

  renderHideActions = ({ item }, rowMap) => {
    const { t, requestChatId } = this.props

    if (_.isString(item)) return null
    const isActive = !(item.blockedBy !== 'disabled' && !!item.blockedBy)

    return (
      <ActionsWrapper isActive={isActive}>
        <BlockWrapper onPress={() => this.handleLockChat(item, rowMap)}>
          <GradientActionWrapper isActive={isActive}>
            {requestChatId === item._id ? (
              <ActivityIndicatorWrapper>
                <ActivityIndicator color="#fff" />
              </ActivityIndicatorWrapper>
            ) : (
              <ActionIcon isActive={isActive} />
            )}
            <ActionText>
              {isActive ? t('LeftoverOnes.block') : t('LeftoverOnes.unblock')}
            </ActionText>
          </GradientActionWrapper>
        </BlockWrapper>
      </ActionsWrapper>
    )
  }

  render() {
    const {
      navigate,
      data,
      t,
      loadChatUsername,
      onShowAd,
      isAdsLoading,
      requestChatId,
    } = this.props
    const { search, isRequest } = this.state

    const searchProps = this.getSearchProps(t, search)

    const chats = this.getChatsData(data)

    return (
      <Container>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
          searchProps={searchProps}
        />
        <Content>
          <SwipeListView
            ListHeaderComponent={
              <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
            }
            data={chats}
            extraData={[loadChatUsername, requestChatId]}
            renderItem={this.renderChatCard}
            renderHiddenItem={this.renderHideActions}
            ListEmptyComponent={<EmptyList />}
            onRefresh={this.handleLoadChats}
            refreshing={isRequest}
            {...swipeListProps}
          />
        </Content>
      </Container>
    )
  }
}

Chats.propTypes = {
  navigate: PropTypes.shape({
    showSidebar: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired,
  }),
  onShowPuck: PropTypes.func,
  data: PropTypes.array,
  onLoadChats: PropTypes.func,
  chats: PropTypes.array,
  onConnectToChat: PropTypes.func,
  loadChatUsername: PropTypes.string,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  onInvokeChatAction: PropTypes.func,
  requestChatId: PropTypes.string,
}

export default Chats
