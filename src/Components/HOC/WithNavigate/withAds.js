import React from 'react'
import PropTypes from 'prop-types'
import { AdMobInterstitial } from 'react-native-admob'
import { InterstitialAdManager } from 'react-native-fbads'

import { Navigation } from 'react-native-navigation'

import { admobUnitId, fbAdsPlacementId } from 'Constants/ads'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { viewedAds } from 'Redux/actions/subscription'
import { createStructuredSelector } from 'reselect'
import { getActiveScreenName } from 'Redux/selectors/navigation'
import adsConfig from 'Config/ads'

import withPuck from '../withPuck'
import withDevTools from '../withDevTools'

AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId])
AdMobInterstitial.setAdUnitID(admobUnitId)

class WithAds extends React.Component {
  static displayName = 'withAds'

  static propTypes = {
    onViewedAds: PropTypes.func,
    screenId: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      isRequest: false,
    }

    this.isVisibleAd = false
    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    AdMobInterstitial.addEventListener('adLeftApplication', () => {
      this.AdShowed()
      this.isVisibleAd = false
    })
  }

  componentDidDisappear() {
    if (!this.isVisibleAd) AdMobInterstitial.removeAllListeners()
  }

  AdShowed = () => {
    const { onViewedAds } = this.props

    onViewedAds(adsConfig.simple)
    this.isVisibleAd = false
  }

  showFbAd = async () => {
    try {
      const didClick = await InterstitialAdManager.showAd(fbAdsPlacementId)
      if (didClick) this.AdShowed()
    } catch (err) {
      if (__DEV__) console.warn(err)
      throw {
        service: 'fbAds',
        message: err.message,
        error: err,
      }
    }

    this.isVisibleAd = false
  }

  showGoogleAd = async () => {
    try {
      await AdMobInterstitial.requestAd()

      await AdMobInterstitial.showAd()
    } catch (err) {
      this.isVisibleAd = false

      throw {
        service: 'googleAds',
        message: err.message,
        error: err,
      }
    }
  }

  handleShowAd = async () => {
    const { onShowPuck } = this.props
    this.isVisibleAd = true

    this.setState({ isRequest: true })

    try {
      // first ads request
      await this.showGoogleAd()
      // --
    } catch (err) {
      if (__DEV__) console.log(err)

      switch (err.service) {
        case 'googleAds':
          try {
            await this.showFbAd()
          } catch (error) {
            onShowPuck({
              type: 'error',
              message: error.message,
            })
          }
          break
        case 'fbAds':
          try {
            await this.showGoogleAd()
          } catch (error) {
            if (__DEV__) console.warn(error)
            onShowPuck({
              type: 'error',
              message: error.message,
            })
          }
          break
        default:
          onShowPuck({
            type: 'error',
            message: err.message,
          })
      }
    }

    this.setState({ isRequest: false })
  }

  render() {
    const { navigationProps, Component } = this.props
    const { isRequest } = this.state

    const nextProps = {
      ...navigationProps,
      ...this.props,
    }

    delete nextProps.onViewedAds
    delete nextProps.screenId

    return (
      <Component
        {...nextProps}
        onShowAd={this.handleShowAd}
        isAdsLoading={isRequest}
      />
    )
  }
}

const actions = {
  onViewedAds: viewedAds,
}

const selectors = createStructuredSelector({
  screenId: getActiveScreenName,
})

export default compose(
  withDevTools,
  withPuck,
  connect(
    selectors,
    actions,
  ),
)(WithAds)
