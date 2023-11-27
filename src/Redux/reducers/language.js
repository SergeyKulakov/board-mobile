import { createReducer } from 'Helpers/redux'

import { SET_LANGUAGE } from 'Redux/actions/language'

import { languages } from 'Constants/languages'

const initialState = {
  activeLanguage: Object.keys(languages)[0],
}

const handlers = {
  [SET_LANGUAGE.SUCCESS]: (state, { language }) => ({
    ...state,
    activeLanguage: language,
  }),
}

export default createReducer(initialState, handlers)
