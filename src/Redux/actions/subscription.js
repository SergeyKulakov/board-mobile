import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { appBundleId } from 'Constants/api'

export const BUT_PLAN = createAsyncAction('subscriptions/BUY_PLAN')
export const buyPlan = (plan, callback) =>
  apiCall({
    endpoint: '/subscription/buy',
    types: BUT_PLAN,
    method: 'POST',
    query: {
      paymentMethod: 'points',
      subscriptionType: plan,
    },
    callback,
  })

export const BUY_POINTS = createAsyncAction('subscription/BUY_POINTS')
export const buyPoints = (value, callback) =>
  apiCall({
    endpoint: '/pts/buy',
    types: BUY_POINTS,
    method: 'POST',
    params: {
      redirect_uri: `${appBundleId}://oauth`,
    },
    query: {
      paymentMethod: 'paypal',
      amount: value,
    },
    callback,
  })

// export const ADS_VIEWED = createAsyncAction('subscription/ADS_VIEWED')
// export const viewedAds = callback => ({
//   type: ADS_VIEWED.REQUEST,
//   callback,
// })

export const ADS_VIEWED = createAsyncAction('subscription/ADS_VIEWED')
export const viewedAds = (planValue, callback) =>
  apiCall({
    endpoint: '/pts/ad-seen',
    types: ADS_VIEWED,
    method: 'POST',
    query: {
      amount: planValue
    },
    callback
  })

export const LOAD_PLANS = createAsyncAction('subscriptions/LOAD_PLANS')
export const loadSubscriptionPlans = callback =>
  apiCall({
    endpoint: '/subscription/price',
    types: LOAD_PLANS,
    method: 'GET',
    callback,
  })

export const LOAD_PTS_COST = createAsyncAction('subscription/LOAD_PTS_COST')
export const loadPtsCost = callback =>
  apiCall({
    endpoint: '/pts/price',
    types: LOAD_PTS_COST,
    method: 'GET',
    callback,
  })

export const SEND_TRANSACTION = createAsyncAction(
  'subscription/SEND_TRANSACTION',
)
export const sendTransaction = (
  { transactionId, paymentMethod, amount, points },
  callback,
) =>
  apiCall({
    endpoint: '/pts/buy/upload-transaction',
    types: SEND_TRANSACTION,
    method: 'POST',
    query: {
      transactionId,
      paymentMethod,
      amount: Number(amount),
    },
    meta: {
      points,
    },
    callback,
  })
