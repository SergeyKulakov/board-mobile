import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setSkipTutorial } from 'Redux/actions/auth'
import { setLanguage } from 'Redux/actions/language'

import { getActiveLanguage } from 'Redux/selectors/settings'

import Component from './OnBoarding'

const actions = {
  onSetSkipTutorial: setSkipTutorial,
  onSetLanguage: setLanguage,
}

const selectors = createStructuredSelector({
  activeLanguage: getActiveLanguage,
})

export default connect(
  selectors,
  actions,
)(Component)
