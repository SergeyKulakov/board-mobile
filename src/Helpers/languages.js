import i18n from 'I18N'
import get from 'lodash/get'
import { languages } from 'Constants/languages'

export const getLanguage = () =>
  languages.find(el => el.type === i18n.locale.slice(0, 2))

export const getTranslate = (path, fallbackText) =>
  get(
    i18n.t(path.split('.')[0]),
    path
      .split('.')
      .slice(1)
      .join('.'),
    fallbackText ||
      path
        .split('.')
        .slice(-1)
        .join(),
  )
