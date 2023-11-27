import { compose } from 'redux'
import { connect } from 'react-redux'

import { withPuck, withNamespaces } from 'Components/HOC'

import { verifyUserAttributes, resendVerifyCode } from 'Redux/actions/user'

import Component from './ConfirmEditEmailOrPhone'

const actions = {
  onSendConfirmCode: verifyUserAttributes,
  onResendConfirmCode: resendVerifyCode,
}

export default compose(
  connect(
    null,
    actions,
  ),
  withPuck,
  withNamespaces,
)(Component)
