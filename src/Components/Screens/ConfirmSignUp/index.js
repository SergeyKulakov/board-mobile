import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withKeyboardEvents, withNamespaces, withPuck } from 'Components/HOC'

import { sendConfirmCode, resendCode } from 'Redux/actions/auth'

import { getAuthLoadInfo } from 'Redux/selectors/auth'

import Component from './ConfirmSignUp'

const actions = {
  onSendConfirmCode: sendConfirmCode,
  onResendCode: resendCode,
}

const selectors = createStructuredSelector({
  loadInfo: getAuthLoadInfo,
})

export default compose(
  connect(
    selectors,
    actions,
  ),
  withKeyboardEvents,
  withNamespaces,
  withPuck,
)(Component)
