import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import i18n from 'I18N'
import * as routes from 'Constants/routes'
import { setupRoot } from 'Navigation'

import { ActivityIndicator } from 'react-native'

import {
  GradientContainer,
  Wrapper,
  SplashText,
  Block,
  LoaderWrapper,
  SplashTextWrapper,
} from './style'

class Splash extends Component {
  componentDidMount() {
    this.setAppConstants()
    this.refreshTokens()
  }

  setAppConstants = async () => {
    const { onSetSystemLanguage } = this.props
    const activeLanguage = await AsyncStorage.getItem('language')

    if (!activeLanguage) onSetSystemLanguage()
    else if (activeLanguage && activeLanguage !== i18n.locale) {
      i18n.locale = activeLanguage
    }
  }

  refreshTokens = async () => {
    const { onRefreshTokens, onSignOut, isShowTutorial } = this.props

    const initialRoute = isShowTutorial ? routes.onBoarding : routes.login

    const refreshToken = await AsyncStorage.getItem('refreshToken')
    if (refreshToken) {
      onRefreshTokens(refreshToken, ({ error }) => {
        if (error) setupRoot(false, routes.login)
        else setupRoot(true)
      })
    } else {
      const isClearPrevSession = await AsyncStorage.getItem('clearUserSession')

      if (isClearPrevSession) {
        onSignOut()
        AsyncStorage.removeItem('clearUserSession')
      }

      setupRoot(false, initialRoute)
    }
  }

  render() {
    return (
      <GradientContainer>
        <Wrapper>
          <Block />
          <Block flex={4}>
            <SplashTextWrapper>
              <SplashText />
            </SplashTextWrapper>
          </Block>
          <Block>
            <LoaderWrapper>
              <ActivityIndicator color="#fff" size="small" />
            </LoaderWrapper>
          </Block>
        </Wrapper>
      </GradientContainer>
    )
  }
}

Splash.propTypes = {
  onSetSystemLanguage: PropTypes.func,
  onRefreshTokens: PropTypes.func,
  onSignOut: PropTypes.func,
  isShowTutorial: PropTypes.bool,
}

export default Splash
