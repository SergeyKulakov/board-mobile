import { createStore, applyMiddleware } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

// saga middleware
import createSagaMiddleware from 'redux-saga'
import runSagas from './middleware/sagas'
import socketMiddleware from './middleware/socket'

// api middleware
import apiMiddleware from './middleware/api'

import rootReducer from './reducers'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [socketMiddleware, apiMiddleware, sagaMiddleware, thunk]

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['navigation', 'socket', 'chats'],
  }

  const enhancers = applyMiddleware(...middlewares)

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, composeWithDevTools(enhancers))

  sagaMiddleware.run(runSagas)

  return store
}

export const store = configureStore()

export const rehydrateStore = () => {
  return new Promise(resolve => {
    const persistor = persistStore(store, null, () => {
      resolve()
    })
  })
}
