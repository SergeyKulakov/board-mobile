import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'

import {
  createSPReview,
  updateReview,
  loadReviewedSp,
} from 'Redux/actions/review'

import { getUser } from 'Redux/selectors/user'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getReviewedProfile } from 'Redux/selectors/review'

import Component from './RateReview'

const actions = {
  onLoadSP: loadReviewedSp,
  onSubmit: createSPReview,
  onUpdate: updateReview,
}

const selectors = createStructuredSelector({
  job: getSpecificJob,
  serviceProvider: getReviewedProfile,
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
