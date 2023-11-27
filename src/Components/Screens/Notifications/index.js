import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withPuck, withNamespaces, withConnectToChat } from 'Components/HOC'

import {
  loadNotifications,
  markNotificationsAsRead,
} from 'Redux/actions/notifications'

import { getNotifications } from 'Redux/selectors/notifications'
import { getUser } from 'Redux/selectors/user'

import Component from './Notifications'

const actions = {
  onLoadData: loadNotifications,
  onMarkAsRead: markNotificationsAsRead,
}

const selectors = createStructuredSelector({
  data: getNotifications,
  user: getUser,
})

export default compose(
  withConnectToChat,
  withNamespaces,
  withPuck,
  connect(
    selectors,
    actions,
  ),
)(Component)
