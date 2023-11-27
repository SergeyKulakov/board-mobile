import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'

// eslint-disable-next-line
import { store, rehydrateStore } from 'Redux'
import { setupNavigation, setupRoot } from 'Navigation'
import * as routes from 'Constants/routes'

if (__DEV__) {
  console.disableYellowBox = true
}

const AppProvider = props => {
  const { children } = props
  return (
    <Provider {...props}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>{children}</View>
    </Provider>
  )
}

const startApp = async () => {
  try {
    await setupNavigation(store, AppProvider)
    await rehydrateStore(store)

    setupRoot(false, routes.initial)
  } catch (err) {
    console.error(err)
  }
}

try {
  startApp()
} catch (err) {
  console.warn(err)
}
