import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withKeyboardEvents from 'Components/HOC/withKeyboardEvents'
import withNamespaces from 'Components/HOC/withNamespaces'

import { getUser } from 'Redux/selectors/user'

import Component from './SelectDateModal'

const actions = {}

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  withNamespaces,
  withKeyboardEvents,
  connect(
    selectors,
    actions,
  ),
)(Component)
