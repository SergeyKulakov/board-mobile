import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'

import {
  loadUserReviews,
  deleteReview,
  loadReviewedSp,
} from 'Redux/actions/review'
import { getReviews, getReviewedProfile } from 'Redux/selectors/review'
import { getUser } from 'Redux/selectors/user'

import Component from './Reviews'

const actions = {
  onLoadReviews: loadUserReviews,
  onDeleteReview: deleteReview,
  onLoadProfile: loadReviewedSp,
}

const selectors = createStructuredSelector({
  reviews: getReviews,
  profile: getReviewedProfile,
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
