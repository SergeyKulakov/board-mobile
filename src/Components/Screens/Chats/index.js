import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withPuck, withNamespaces, withConnectToChat } from 'Components/HOC'
import withChatActions from 'Components/HOC/withChatActions'

import { loadChatList } from 'Redux/actions/chats'

import { getUser } from 'Redux/selectors/user'
import { getChats } from 'Redux/selectors/chats'

import Component from './Chats'

const actions = {
  onLoadChats: loadChatList,
}

const selectors = createStructuredSelector({
  data: getChats,
  user: getUser,
})

export default compose(
  withChatActions,
  withConnectToChat,
  withNamespaces,
  withPuck,
  connect(
    selectors,
    actions,
  ),
)(Component)
