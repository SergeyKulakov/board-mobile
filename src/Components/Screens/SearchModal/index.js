import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Component from './SearchModal'

const actions = {}

const selectors = createStructuredSelector({})

export default connect(
  selectors,
  actions,
)(Component)
