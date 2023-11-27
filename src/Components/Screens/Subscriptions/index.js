import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'
import withIap from 'Components/HOC/withIap'

import {
  loadSubscriptionPlans,
  loadPtsCost,
  sendTransaction,
} from 'Redux/actions/subscription'

import {
  getPoints,
  getPlans,
  getPrice,
  getActiveSubscriptionType,
  getPointsExpiryDate,
} from 'Redux/selectors/subscriptions'
import { getUser } from 'Redux/selectors/user'

import Component from './Subscriptions'

const actions = {
  onLoadPlans: loadSubscriptionPlans,
  onLoadPrice: loadPtsCost,
  onSendTransaction: sendTransaction,
}

const selectors = createStructuredSelector({
  user: getUser,
  plans: getPlans,
  points: getPoints,
  price: getPrice,
  activePlanType: getActiveSubscriptionType,
  pointsExpiryDate: getPointsExpiryDate,
})

export default compose(
  withIap,
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
