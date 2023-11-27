import i18n from 'I18N'

export const getText = () => ({
  getCategoryTitle: text => i18n.t('services')[text],
  screenTitle: 'need text!',
  listTitle: i18n.t('AddServiceSubCatScreen.selectSubCategory'),
})
