import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withPuck, withNamespaces } from 'Components/HOC'

import { loadPostedJobs } from 'Redux/actions/postedJobs'

import { getPostedJobs } from 'Redux/selectors/postedJobs'
import { getUser } from 'Redux/selectors/user'

import Component from './SelectJobModal'

const actions = {
  onLoadPostedJobs: loadPostedJobs,
}

const selectors = createStructuredSelector({
  jobs: getPostedJobs,
  user: getUser,
})

export default compose(
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
