import i18n from 'I18N'

export const getText = () => ({
  jobsMore: i18n.t('serviceProvider.jobsDone'),
  hireNow: i18n.t('serviceProvider.hireNow'),
  more: i18n.t('serviceProvider.more'),
  getServiceTitle: value => i18n.t(`services.${value}`),
})
