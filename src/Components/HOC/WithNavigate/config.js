import * as routes from 'Constants/routes'

export default {
  removedPropsKeys: [
    'withSaveComponentIdToRedux',
    'onChangeNavigation',
    'Component',
    'rootTag',
    'prevScreenId',
    'isModal',
    'history',
    'isRequest',
  ],
  rootScreensIds: [
    routes.myJobs,
    routes.postJob,
    routes.findHelp,
    routes.findJobs,
    routes.myJobs,
    routes.myFavourites,
    routes.notifications,
    routes.myRequests,
    routes.profile,
  ],
  disabledSideMenu: {
    sideMenu: {
      left: {
        enabled: false,
        visible: false,
      },
    },
  },
}
