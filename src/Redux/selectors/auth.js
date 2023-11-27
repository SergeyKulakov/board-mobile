import { createSelector } from 'reselect'

const authData = store => store.auth

export const getSkipTutorialState = createSelector(
  authData,
  data => data.isTutorialShow,
)
export const isAuth = createSelector(
  authData,
  data => data.isAuth,
)
export const getAccessToken = createSelector(
  authData,
  data => data.accessToken,
)
export const getIdToken = createSelector(
  authData,
  data => data.idToken,
)
export const getAuthLoadInfo = createSelector(
  authData,
  data => data.loadInfo,
)
export const getRefreshTokenRequestsCount = createSelector(
  authData,
  data => data.refreshTokenRequestsCount,
)
