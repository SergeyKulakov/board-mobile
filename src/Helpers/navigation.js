import { Navigation } from 'react-native-navigation'

import { sideMenu } from 'Constants/routes'

const push = (componentId, route, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: route,
      options: {
        topBar: {
          visible: false,
        },
      },
      passProps: {
        ...passProps,
      },
    },
  })
}

const pop = screenId => {
  Navigation.pop(screenId)
}

const popTo = screenId => {
  Navigation.popTo(screenId)
}

const showModal = (route, props) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: route,
            passProps: {
              ...props,
            },
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  })
}

const closeModal = screenId => {
  Navigation.dismissModal(screenId)
}

const setSidebarState = visible => {
  Navigation.mergeOptions(sideMenu, {
    sideMenu: {
      left: {
        visible,
      },
    },
  })
}

export const navigation = {
  push,
  pop,
  popTo,
  showModal,
  closeModal,
  setSidebarState,
}
