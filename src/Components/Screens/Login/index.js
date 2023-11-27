import { compose } from 'redux'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck, withKeyboardEvents } from 'Components/HOC'

import { signIn } from 'Redux/actions/auth'
import { setLanguage } from 'Redux/actions/language'

import Component from './Login'

const actions = {
  onSignIn: signIn,
  onSetLanguage: setLanguage,
}

// const selectors = createStructuredSelector({})

export default compose(
  connect(
    null,
    actions,
  ),
  withNamespaces,
  withPuck,
  withKeyboardEvents,
)(Component)
