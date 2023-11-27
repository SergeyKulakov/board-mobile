import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getSpecificJob } from 'Redux/selectors/jobs'

import Component from './MapModal'

const actions = {}

const selectors = createStructuredSelector({
  job: getSpecificJob,
})

export default connect(
  selectors,
  actions,
)(Component)
