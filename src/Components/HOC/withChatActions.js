import React from 'react'

import _ from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { blockChat, unblockChat, loadChatList } from 'Redux/actions/chats'

import withPuck from './withPuck'

function withChatActions(Component) {
  return class extends React.Component {
    state = {
      requestChatId: null,
    }

    showError = (error, callback) => {
      const { onShowPuck, getError } = this.props

      onShowPuck({
        type: 'error',
        message: getError(error),
        callback,
      })
    }

    showSuccess = callback => {
      const { onShowPuck } = this.props

      onShowPuck({ callback })
    }

    blockChat = (chatId, callback) => {
      const { onBlockChat } = this.props
      this.setState({ requestChatId: chatId })

      onBlockChat(chatId, ({ error }) => {
        this.setState({ requestChatId: null }, () => {
          if (error) this.showError(error, callback)
          else this.showSuccess(callback)
        })
      })
    }

    unblockChat = (chatId, callback) => {
      const { onUnblockChat } = this.props

      this.setState({ requestChatId: chatId })

      onUnblockChat(chatId, ({ error }) => {
        this.setState({ requestChatId: null }, () => {
          if (error) this.showError(error, callback)
          else this.showSuccess(callback)
        })
      })
    }

    handleCallChatAction = (chat, callback) => {
      const { onLoadChats, onShowPuck, getError } = this.props
      if (_.has(chat, '_id')) {
        if (chat.blockedBy === 'disabled' || !chat.blockedBy)
          this.blockChat(chat._id, callback)
        else this.unblockChat(chat._id, callback)
        // this.blockChat(chat._id, callback)
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
    }

    render() {
      const { onBlockChat, onUnblockChat, ...props } = this.props
      const { requestChatId } = this.state

      return (
        <Component
          {...props}
          requestChatId={requestChatId}
          onInvokeChatAction={this.handleCallChatAction}
        />
      )
    }
  }
}

const actions = {
  onBlockChat: blockChat,
  onUnblockChat: unblockChat,
  onLoadChats: loadChatList,
}

export default compose(
  withPuck,
  connect(
    null,
    actions,
  ),
  withChatActions,
)
