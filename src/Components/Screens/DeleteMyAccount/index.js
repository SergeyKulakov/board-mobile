import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withPuck, withNamespaces } from 'Components/HOC'

import { deleteAccount } from 'Redux/actions/settings'

import { getUser } from 'Redux/selectors/user'

import Component from './DeleteMyAccount'

const actions = {
  onDeleteAccount: deleteAccount,
}

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  connect(
    selectors,
    actions,
  ),
  withPuck,
  withNamespaces,
)(Component)
