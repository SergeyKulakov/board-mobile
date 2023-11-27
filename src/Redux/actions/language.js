import { createAsyncAction } from 'Helpers/redux'

export const SET_LANGUAGE = createAsyncAction('language/SET')
export const setLanguage = language => ({
  type: SET_LANGUAGE.REQUEST,
  language,
})

export const SET_SYSTEM_LANGUAGE = 'language/SET_SYSTEM'
export const setSystemLanguage = callback => ({
  type: SET_SYSTEM_LANGUAGE,
  callback,
})
