import i18n from 'I18N'
import { getTranslate } from 'Helpers/languages'

export const getText = () => ({
  popularCategories: i18n.t('findJobPage.popularCategories'),
  carsAndVehicles: i18n.t('services')['Cars & Vehicles'],
  searchPlaceholder: i18n.t('homePage.searchHere'),
  screenTitle: i18n.t('common.breadCrumbs.home'),
  popular: getTranslate('AddServiceCatScreen.popularCategories'),
  getServiceTitle: text => i18n.t('services')[text],
  PeopleList: {
    title: getTranslate('landingPage.nearestServiceProviders'),
  },
})
