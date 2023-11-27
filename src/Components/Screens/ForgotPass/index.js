import { compose } from 'redux'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import { withPuck, withNamespaces } from 'Components/HOC'

import { forgotPass } from 'Redux/actions/auth'

import Component from './ForgotPass'

const actions = {
  onForgotPass: forgotPass,
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
