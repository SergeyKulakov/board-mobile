import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withOrientation from 'Components/HOC/withOrientation'

import { getUser } from 'Redux/selectors/user'

import Component from './JobsList'

const actions = {}

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  withOrientation,
  connect(
    selectors,
    actions,
  ),
)(Component)
