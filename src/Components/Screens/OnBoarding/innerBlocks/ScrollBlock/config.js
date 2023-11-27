import * as images from 'Assets/images/Onboarding'
import i18n from 'I18N'

export const getData = () => [
  {
    image: images.findAJobs,
    title: i18n.t('landingPage.findOddJobsNeed'),
    subTitle: i18n.t('landingPage.usePaidServicesBetween'),
  },
  {
    image: images.findHelpForYourProject,
    title: i18n.t('landingPage.findHelpFor'),
    subTitle: i18n.t('landingPage.postAJobAndGet'),
  },
  {
    image: images.pointsEarnCopy,
    title: i18n.t('landingPage.viewAds'),
    subTitle: i18n.t('landingPage.earnPointsAndRedeem'),
  },
  {
    image: images.tracking,
    title: i18n.t('landingPage.trackService'),
    subTitle: i18n.t('landingPage.viewLocation'),
  },
]
