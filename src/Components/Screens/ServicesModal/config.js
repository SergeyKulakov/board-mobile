import i18n from 'I18N'
import { getTranslate } from 'Helpers/languages'

export function filteredItems(items, value) {
  return items.filter(el => {
    const title = i18n.t('services')[el.title]
    return (title || '').toLowerCase().indexOf(value.toLowerCase()) !== -1
  })
}

export const getText = () => ({
  getServiceTitle: text => i18n.t('services')[text],
  title: i18n.t('landingPage.selectCategory'),
  step: i18n.t('AddServiceCatScreen.stepServices'),
  stepTwo: i18n.t('AddServiceSubCatScreen.stepServices'),
  subServices: i18n.t('AddServiceSubCatScreen.selectSubCategory'),
  addService: i18n.t('AddServiceCatScreen.addServices'),
  errorMessage: i18n.t('profilePage.overflowError'),
  deselectError: i18n.t('profilePage.overflowError'),
  search: getTranslate('homePage.searchHere'),
  continueButton: i18n.t('AddServiceCatScreen.continue'),
  popular: i18n.t('AddServiceCatScreen.popularCategories'),
  all: i18n.t('AddServiceCatScreen.allCategories'),
})
