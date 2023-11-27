import i18n from 'I18N'

const _getProfileFieldText = text => i18n.t(`profilePage.fields.${text}.label`)

export const getText = () => ({
  Header: {
    title: i18n.t('landingPage.filter'),
    clearText: i18n.t('landingPage.clearAll'),
  },
  Location: {
    addressLabel: _getProfileFieldText('address'),
    addressPlaceholder: _getProfileFieldText('address'),
    city: _getProfileFieldText('city'),
    state: _getProfileFieldText('state'),
    zipCode: _getProfileFieldText('zipCode'),
    country: _getProfileFieldText('country'),
    errorAddressLocated: i18n.t('jobPost.errorAddressLocated'),
  },
  Services: {
    errorMessage: i18n.t('profilePage.fields.services.validationErrors.length'),
    getCategoryTitle: text => i18n.t('services')[text],
    search: i18n.t('headerBlock.searchPlaceholder'),
    popular: i18n.t('landingPage.popularCategories'),
    all: i18n.t('landingPage.allCategories'),
    label: i18n.t('jobPost.selectCategory'),
    placeholder: i18n.t('landingPage.searchJob'),
  },
  submitButton: i18n.t('landingPage.applyFilters').toUpperCase(),
})

export const getInitialValues = (filters = {}, selectedAll = false) => ({
  address: filters.address || '',
  city: filters.city || '',
  state: filters.state || '',
  zipCode: filters.zipCode || '',
  country: filters.country || '',
  searchCategories: '',
  lat: filters.lat || '',
  lon: filters.lon || '',
  services: filters.services || [],
  search: '',
  radius: '10',
  selectedAll,
})
