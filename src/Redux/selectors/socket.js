import { createSelector } from 'reselect'

const getData = store => store.socket

export const getIsConnectedSocket = createSelector(
  getData,
  data => data.isConnected,
)

export const getConnectionAttempt = createSelector(
  getData,
  data => data.attempt,
)
