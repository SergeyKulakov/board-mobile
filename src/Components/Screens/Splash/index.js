import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setSystemLanguage } from 'Redux/actions/language'
import { refreshTokens, signOut } from 'Redux/actions/auth'

import { getSkipTutorialState } from 'Redux/selectors/auth'

import Component from './Splash'

const actions = {
  onSetSystemLanguage: setSystemLanguage,
  onRefreshTokens: refreshTokens,
  onSignOut: signOut,
}

const selectors = createStructuredSelector({
  isShowTutorial: getSkipTutorialState,
})

export default connect(
  selectors,
  actions,
)(Component)
