import { compose } from 'redux'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import { withPuck, withNamespaces } from 'Components/HOC'

import { confirmResetPassword } from 'Redux/actions/auth'

import Component from './ConfirmResetPassword'

const actions = {
  onResetPassword: confirmResetPassword,
}

// const selectors = createStructuredSelector({})

export default compose(
  connect(
    null,
    actions,
  ),
  withPuck,
  withNamespaces,
)(Component)
