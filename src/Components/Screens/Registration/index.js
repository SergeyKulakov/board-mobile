import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'

import { setLanguage } from 'Redux/actions/language'
import { signUp } from 'Redux/actions/auth'

import { getAuthLoadInfo } from 'Redux/selectors/auth'

import Component from './Registration'

const actions = {
  onSignUp: signUp,
  onSetLanguage: setLanguage,
}

const selectors = createStructuredSelector({
  loadInfo: getAuthLoadInfo,
})

export default compose(
  connect(
    selectors,
    actions,
  ),
  withNamespaces,
  withPuck,
)(Component)
