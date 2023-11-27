import I18nJs from 'i18n-js'

I18nJs.locale = 'en'
export const getLanguages = (): Promise<string[]> => Promise.resolve(['en'])
export default I18nJs
