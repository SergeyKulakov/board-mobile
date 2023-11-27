import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withNamespaces from 'Components/HOC/withNamespaces'

import { getNotifications } from 'Redux/selectors/notifications'

import Component from './NavigationMenu'

const actions = {}

const selectors = createStructuredSelector({
  notifications: getNotifications,
})

export default compose(
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
