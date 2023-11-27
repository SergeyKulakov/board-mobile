import { appBundleId } from 'Constants/api'

import {
  loadPtsCost,
  buyPlan,
  buyPoints,
  loadSubscriptionPlans,
  viewedAds,
} from '../subscription'

describe('actions/subscription', () => {
  const callback = () => null

  it('loadPtsCost', () => {
    const args = [callback]
    const result = loadPtsCost(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/pts/price',
        types: {
          REQUEST: 'subscription/LOAD_PTS_COST.REQUEST',
          SUCCESS: 'subscription/LOAD_PTS_COST.SUCCESS',
          FAILURE: 'subscription/LOAD_PTS_COST.FAILURE',
        },
        method: 'GET',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('buyPlan', () => {
    const args = ['plan', callback]
    const result = buyPlan(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/subscription/buy',
        types: {
          REQUEST: 'subscriptions/BUY_PLAN.REQUEST',
          SUCCESS: 'subscriptions/BUY_PLAN.SUCCESS',
          FAILURE: 'subscriptions/BUY_PLAN.FAILURE',
        },
        method: 'POST',
        query: {
          paymentMethod: 'points',
          subscriptionType: 'plan',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('buyPoints', () => {
    const args = ['value', callback]
    const result = buyPoints(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/pts/buy',
        types: {
          REQUEST: 'subscription/BUY_POINTS.REQUEST',
          SUCCESS: 'subscription/BUY_POINTS.SUCCESS',
          FAILURE: 'subscription/BUY_POINTS.FAILURE',
        },
        method: 'POST',
        params: {
          redirect_uri: `${appBundleId}://oauth`,
        },
        query: {
          paymentMethod: 'paypal',
          amount: 'value',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadSubscriptionPlans', () => {
    const args = [callback]
    const result = loadSubscriptionPlans(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/subscription/price',
        types: {
          REQUEST: 'subscriptions/LOAD_PLANS.REQUEST',
          SUCCESS: 'subscriptions/LOAD_PLANS.SUCCESS',
          FAILURE: 'subscriptions/LOAD_PLANS.FAILURE',
        },
        method: 'GET',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('viewedAds', () => {
    const result = viewedAds(callback)

    expect(result).toStrictEqual({
      type: 'subscription/ADS_VIEWED.REQUEST',
      callback,
    })
  })
})
