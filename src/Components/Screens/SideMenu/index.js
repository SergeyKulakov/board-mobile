import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withOrientation } from 'Components/HOC'

import { signOut } from 'Redux/actions/auth'
import { setPremium } from 'Redux/actions/user'

import { getUser } from 'Redux/selectors/user'
import { getActiveScreenName } from 'Redux/selectors/navigation'

import Component from './SideMenu'

const actions = {
  onSignOut: signOut,
  onSetPremium: setPremium,
}

const selectors = createStructuredSelector({
  user: getUser,
  activeScreenName: getActiveScreenName,
})

export default compose(
  withOrientation,
  connect(
    selectors,
    actions,
  ),
)(Component)
