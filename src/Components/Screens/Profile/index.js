import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withPuck, withNamespaces } from 'Components/HOC'

import { setLanguage } from 'Redux/actions/language'
import {
  updateUserAttributes,
  resendVerifyCode,
  loadUserData,
} from 'Redux/actions/user'
import { loadServices } from 'Redux/actions/services'

import { getUser, getUserRequestInfo } from 'Redux/selectors/user'
import { getCategories, getServicesLoadInfo } from 'Redux/selectors/services'

import Component from './Profile'

const actions = {
  onUpdateUserData: updateUserAttributes,
  onLoadServices: loadServices,
  onSetLanguage: setLanguage,
  onResendVerifyCode: resendVerifyCode,
  onLoadUser: loadUserData,
}

const selectors = createStructuredSelector({
  user: getUser,
  isRequest: getUserRequestInfo,
  services: getCategories,
  servicesLoadInfo: getServicesLoadInfo,
})

export default compose(
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
