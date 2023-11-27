import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withPuck, withNamespaces } from 'Components/HOC'

import { setLanguage } from 'Redux/actions/language'
import {
  setNotifications,
  setJobAlerts,
  setAccountStatus,
} from 'Redux/actions/settings'

import { getUser } from 'Redux/selectors/user'
import { getSettings } from 'Redux/selectors/settings'

import Component from './Settings'

const actions = {
  onSetNotifications: setNotifications,
  onSetJobAlerts: setJobAlerts,
  onSetLanguage: setLanguage,
  onSetAccountStatus: setAccountStatus,
}

const selectors = createStructuredSelector({
  settings: getSettings,
  user: getUser,
})

export default compose(
  connect(
    selectors,
    actions,
  ),
  withPuck,
  withNamespaces,
)(Component)
