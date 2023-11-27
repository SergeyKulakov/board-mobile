import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withOrientation from 'Components/HOC/withOrientation'

import { getActiveScreenName } from 'Redux/selectors/navigation'
import { getUser } from 'Redux/selectors/user'

import Component from './ProviderProfileCard'

const actions = {}

const selectors = createStructuredSelector({
  activeScreenName: getActiveScreenName,
  user: getUser,
})

export default compose(
  withOrientation,
  connect(
    selectors,
    actions,
  ),
)(Component)
