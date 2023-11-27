import React from 'react'
import _ from 'lodash'

import { Linking, Platform } from 'react-native'
import * as RNIap from 'react-native-iap'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getPrice, getPoints } from 'Redux/selectors/subscriptions'
import { buyPlan, buyPoints, sendTransaction } from 'Redux/actions/subscription'
import { loadUserData } from 'Redux/actions/user'

import withPuck from './withPuck'

function withIap(Component) {
  return class extends React.Component {
    state = {
      isRequest: false,
      activePlan: null,
    }

    purchaseUpdateSubscription = null

    purchaseErrorSubscription = null

    componentDidMount() {
      if (Platform.OS === 'android') {
        Linking.addEventListener('url', this.openUrl)
      }
    }

    componentWillUnmount() {
      if (Platform.OS === 'android') {
        Linking.removeEventListener('url', this.openUrl)
      }

      if (Platform.OS === 'ios') {
        if (this.purchaseUpdateSubscription) {
          this.purchaseUpdateSubscription.remove()
          this.purchaseUpdateSubscription = null
        }
        if (this.purchaseErrorSubscription) {
          this.purchaseErrorSubscription.remove()
          this.purchaseErrorSubscription = null
        }
      }
    }

    openUrl = () => {
      const { onShowPuck, onUpdateUser } = this.props
      const { activePlan } = this.state

      if (_.has(activePlan, 'type')) this.buyPlan()
      else onUpdateUser()

      onShowPuck()
    }

    buyPlan = async () => {
      const { onBuyPlan, onShowPuck, getError, onUpdateUser } = this.props
      const { activePlan } = this.state
      if (!_.has(activePlan, 'type')) return

      this.setState({ isRequest: true })

      const type =
        activePlan.type === 'monthPremiumSubscriptionCost'
          ? 'monthly'
          : 'yearly'

      onBuyPlan(type, ({ error }) => {
        this.setState({ isRequest: false, activePlan: null })
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        } else {
          onShowPuck()
          onUpdateUser()
        }
      })
    }

    buyPoints = async value => {
      const {
        onShowPuck,
        onByPoints,
        getError,
        onSendTransaction,
        t,
        price,
      } = this.props
      const { activePlan } = this.state

      this.setState({ isRequest: true })

      if (Platform.OS === 'ios') {
        const items = [
          `com.spotjobs.mobile.${_.isString(value) ? value : `points${value}`}`,
        ]
        const isConnected = await RNIap.initConnection()
        if (!isConnected) {
          onShowPuck({
            type: 'error',
            message: t('apiErrors.lostConnection'),
          })
          return
        }
        const products = await RNIap.getProducts(items)

        const product = products.find(el => el.productId === items[0])

        if (_.has(product, 'productId')) {
          try {
            const purchase = await RNIap.requestPurchase(product.productId)

            await RNIap.finishTransactionIOS(purchase.transactionId)

            let amount = (value * price).toFixed(2)
            if (value === 'monthly') amount = (105 * price).toFixed(2)
            if (value === 'yearly') amount = (1020 * price).toFixed(2)

            const request = {
              transactionId: purchase.transactionId,
              paymentMethod: 'appleIap',
              amount,
              points: value,
            }

            onSendTransaction(request, ({ error }) => {
              if (error) {
                this.setState({ isRequest: false })
                onShowPuck({ type: 'error', message: getError(error) })
              } else if (activePlan) {
                this.buyPlan()
              } else {
                this.setState({ isRequest: false })
              }
            })
          } catch (err) {
            this.setState({ isRequest: false, activePlan: null })
            console.warn(err.code, err.message)
          }
        } else if (__DEV__) console.warn(`can't find product id: ${product}`)
      } else {
        onByPoints(Number(value), ({ error }) => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
            })
          } else if (activePlan) this.buyPlan()
          else this.setState({ isRequest: false })
        })
      }
    }

    handleBuyClick = data => {
      const { points } = this.props
      if (_.isNumber(data)) {
        this.buyPoints(data)
      } else if (_.has(data, 'val')) {
        const type =
          data.type === 'monthPremiumSubscriptionCost' ? 'monthly' : 'yearly'
        if (points >= data.val) {
          this.setState({ activePlan: data }, this.buyPlan)
        } else {
          this.setState({ activePlan: data }, () => {
            this.buyPoints(type)
          })
        }
      }
    }

    render() {
      const { price, points, onSendTransaction, ...props } = this.props
      const { isRequest } = this.state

      return (
        <Component
          {...props}
          onBuy={this.handleBuyClick}
          isBuyRequest={isRequest}
        />
      )
    }
  }
}

const selectors = createStructuredSelector({
  price: getPrice,
  points: getPoints,
})

const actions = {
  onBuyPlan: buyPlan,
  onUpdateUser: loadUserData,
  onByPoints: buyPoints,
  onSendTransaction: sendTransaction,
}

export default compose(
  withPuck,
  connect(
    selectors,
    actions,
  ),
  withIap,
)
