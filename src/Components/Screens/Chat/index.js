import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  withPuck,
  withKeyboardEvents,
  withNamespaces,
  withConnectToChat,
} from 'Components/HOC'
import withChatActions from 'Components/HOC/withChatActions'

import { loadChatList, sendMessage, sendVoiceMessage } from 'Redux/actions/chats'

import { getUser } from 'Redux/selectors/user'
import { getActiveChat } from 'Redux/selectors/chats'

import Component from './Chat'

const actions = {
  onLoadChatList: loadChatList,
  onSendMessage: sendMessage,
  onSendVoiceMessage: sendVoiceMessage,
}

const selectors = createStructuredSelector({
  user: getUser,
  data: getActiveChat,
})

export default compose(
  withChatActions,
  withConnectToChat,
  withKeyboardEvents,
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
