import * as routes from 'Constants/routes'
import i18n from 'I18N'

export const getData = () => [
  {
    icon: 'home',
    text: i18n.t('common.breadCrumbs.home'),
    key: routes.home,
  },
  {
    icon: 'search',
    text: i18n.t('landingPage.findJobs'),
    key: routes.findJobs,
  },
  {
    icon: 'pencil-square-o',
    text: i18n.t('landingPage.postJobs'),
    key: routes.postJob,
  },
  {
    icon: {
      type: 'mci',
      name: 'worker',
    },
    text: i18n.t('landingPage.findHelp'),
    key: routes.findHelp,
  },
  {
    icon: 'list-alt',
    text: i18n.t('landingPage.myJobs'),
    key: routes.myJobs,
  },
  {
    icon: 'heart',
    text: i18n.t('landingPage.favorites'),
    key: routes.myFavourites,
  },
  {
    icon: 'bell',
    text: i18n.t('landingPage.notifications'),
    key: routes.notifications,
  },
  {
    icon: 'comments',
    text: i18n.t('landingPage.chats'),
    key: routes.chats,
  },
  {
    icon: 'location-arrow',
    text: i18n.t('landingPage.myRequests'),
    key: routes.myRequests,
  },
  {
    icon: {
      type: 'fa5',
      name: 'search-location',
    },
    text: i18n.t('landingPage.trackNow'),
    key: routes.track,
  },
  {
    icon: 'user-circle',
    text: i18n.t('landingPage.myAccount'),
    key: routes.profile,
  },
  {
    icon: {
      name: 'wallet',
      type: 'ant',
    },
    text: i18n.t('landingPage.subscription'),
    key: routes.subscriptions,
  },
  {
    icon: 'cog',
    text: i18n.t('landingPage.settings'),
    key: routes.settings,
  },
]

export const getText = () => ({
  logout: i18n.t('profilePage.logOut'),
  isPremium: i18n.t('homePage.becomePremium'),
})
