import i18n from 'I18N'

export const getText = () => ({
  Header: {
    title: i18n.t('headerBlock.menu.findHelp'),
    getTabTitle: name => i18n.t(`findJobPage.${name}`),
  },
})
