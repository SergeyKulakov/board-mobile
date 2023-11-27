import { createSelector } from 'reselect'

const getData = store => store.settings

export const getSettings = createSelector(
  getData,
  data => data.settings,
)

export const getActiveLanguage = createSelector(
  getData,
  data => data.language,
)
