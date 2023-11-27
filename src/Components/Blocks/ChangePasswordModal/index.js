import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withNamespaces from 'Components/HOC/withNamespaces'
import withPuck from 'Components/HOC/withPuck'

import { changePassword } from 'Redux/actions/settings'
import { getUser } from 'Redux/selectors/user'

import Component from './ChangePasswordModal'

const actions = { onSubmit: changePassword }

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  withNamespaces,
  withPuck,
  connect(
    selectors,
    actions,
  ),
)(Component)
