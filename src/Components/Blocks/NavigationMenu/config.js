import * as routes from 'Constants/routes'

export const data = [
  {
    icon: 'search',
    text: 'headerBlock.menu.findJob',
    key: routes.findJobs,
  },
  {
    icon: 'pencil-square-o',
    text: 'headerBlock.menu.postJob',
    key: routes.postJob,
  },
  {
    icon: {
      type: 'mci',
      name: 'worker',
    },
    text: 'headerBlock.menu.findHelp',
    key: routes.findHelp,
  },
  {
    icon: 'list-alt',
    text: 'headerBlock.menu.myJobs',
    key: routes.myJobs,
  },
  {
    icon: 'heart',
    text: 'headerBlock.menu.myFavourites',
    key: routes.myFavourites,
  },
  {
    icon: 'bell',
    text: 'homePage.Notifications',
    key: routes.notifications,
  },
  {
    icon: 'comments',
    text: 'homePage.chats',
    key: routes.chats,
  },
  {
    icon: 'location-arrow',
    text: 'headerBlock.menu.myRequests',
    key: routes.myRequests,
  },
  {
    icon: {
      type: 'fa5',
      name: 'search-location',
    },
    text: 'headerBlock.menu.trackNow',
    key: routes.track,
  },
  {
    icon: 'user-circle',
    text: 'common.YourProfile',
    key: routes.profile,
  },
  {
    // image: wallet,
    icon: {
      name: 'wallet',
      type: 'ant',
    },
    text: 'common.subscription',
    key: routes.subscriptions,
  },
  {
    icon: 'cog',
    text: 'common.setting',
    key: routes.settings,
  },
]
