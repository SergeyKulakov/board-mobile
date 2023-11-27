import i18n from 'I18N'

export const getText = () => ({
  Header: {
    title: i18n.t('landingPage.findJobs'),
    getTabTitle: name => i18n.t(`findJobPage.${name}`),
  },
  MapView: {},
})

export const tabRoutes = [{ key: 'ListView' }, { key: 'MapView' }]
