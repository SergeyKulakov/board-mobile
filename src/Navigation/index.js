import { Navigation } from 'react-native-navigation'
import getRoot from './roots'

import registerScreens from './registerScreens'

import defaultOptions from './defaultOptions'

// needs to avoid double mount the same stack
let isAuthRootMounted = null
let prevRootElementRoute = null

export const setupRoot = (isAuth, rootElementRoute) => {
  if (
    isAuthRootMounted !== isAuth ||
    prevRootElementRoute !== rootElementRoute
  ) {
    const root = getRoot(isAuth, rootElementRoute)

    Navigation.setRoot({
      root,
    }).catch(err => console.warn(err))

    isAuthRootMounted = isAuth
    prevRootElementRoute = rootElementRoute
  }
}

export const setupNavigation = (store, Provider) => {
  return new Promise(resolve => {
    registerScreens(store, Provider)

    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions(defaultOptions)

      resolve()
    })
  })
}
