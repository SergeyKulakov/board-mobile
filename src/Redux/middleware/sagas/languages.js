import { put, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _ from 'lodash'
import { SET_LANGUAGE } from 'Redux/actions/language'
import AsyncStorage from '@react-native-community/async-storage'
import { setPreferredLanguage } from 'Redux/actions/settings'
import * as routes from 'Constants/routes'

import i18n from 'I18N'
import { languages } from 'Constants/languages'
import { getLanguages } from 'react-native-i18n'
import { getActiveScreenName } from 'Redux/selectors/navigation'

export function* onSetLanguage({ language }) {
  const activeLanguage = i18n.locale
  if (language === activeLanguage) {
    yield put({
      type: SET_LANGUAGE.FAILURE,
      data: { message: 'this language is active' },
    })
  }

  i18n.locale = language
  yield AsyncStorage.setItem('language', language)

  yield put({ type: SET_LANGUAGE.SUCCESS, language })

  const screenId = yield select(getActiveScreenName)
  if (
    screenId !== routes.login &&
    screenId !== routes.singUp &&
    screenId !== routes.onBoarding
  ) {
    yield delay(5000)
    yield put(setPreferredLanguage(language))
  }
}

export function* onSetSystemLanguage({ callback }) {
  const systemLanguages = yield call(getLanguages)
  const systemLanguageType = systemLanguages[0].slice(0, 2)

  const activeLanguage = i18n.defaultLocale

  if (systemLanguageType === activeLanguage) {
    yield AsyncStorage.setItem('language', systemLanguageType)
    if (_.isFunction(callback)) callback({ activeLanguage })
    return put({
      type: SET_LANGUAGE.FAILURE,
      language: systemLanguageType,
      data: {
        message: 'this language is active',
      },
    })
  }

  if (languages.find(el => el.type === systemLanguageType)) {
    yield AsyncStorage.setItem('language', systemLanguageType)
    i18n.locale = systemLanguageType
    if (_.isFunction(callback)) callback({ activeLanguage: systemLanguageType })
    yield put({
      type: SET_LANGUAGE.SUCCESS,
      language: systemLanguageType,
    })
  } else {
    i18n.locale = 'en'
    if (_.isFunction(callback)) callback({ activeLanguage: 'en' })
    yield AsyncStorage.setItem('language', 'en')
    yield put({
      type: SET_LANGUAGE.FAILURE,
      message: 'system language is not supported, default language is English',
      language: 'en',
    })
  }
}
