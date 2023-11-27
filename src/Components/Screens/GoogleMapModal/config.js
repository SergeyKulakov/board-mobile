import i18n from 'I18N'

export default {
  MapView: {
    mapType: 'standard',
    showsUserLocation: false,
    zoomEnabled: true,
  },
}

export const getText = () => ({
  saveButton: i18n.t('profilePage.saveBtnLabel'),
})
