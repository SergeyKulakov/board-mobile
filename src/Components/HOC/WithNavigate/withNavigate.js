import React from 'react'
import _ from 'lodash'
// redux connect
import * as routes from 'Constants/routes'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// - action
import { setNavigation } from 'Redux/actions/navigation'
// - selector
import { getActiveScreenName } from 'Redux/selectors/navigation'
import { getUserRequestInfo } from 'Redux/selectors/user'
// --
import { Navigation } from 'react-native-navigation'
import { setupRoot } from 'Navigation'
import { navigation } from 'Helpers/navigation'
import Toast from '@rimiti/react-native-toastify'
import { BackHandler, Platform } from 'react-native'
import Drawer from 'react-native-side-menu'
import { metrics } from 'Themes'

import AdsWrapper from './withAds'
import SideMenu from './SideMenu'
import withOrientation from '../withOrientation'
import config from './config'
import { Wrapper, styles } from './style'

class WithNavigate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpenDrawer: false,
    }

    Navigation.events().bindComponent(this)
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackPress,
      )
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') this.backHandler.remove()
  }

  handleMergeOptions = options => {
    const { componentId } = this.props
    if (_.isObject(options) && _.isString(componentId)) {
      Navigation.mergeOptions(componentId, options)
    }
  }

  handleBackPress = () => {
    const { activeScreenName } = this.props
    return activeScreenName === routes.home
  }

  handlePush = (route, props) => {
    const { componentId, activeScreenName } = this.props

    try {
      if (route === routes.home) this.handlePopTo(routes.home)
      else {
        const prevScreenId = _.last(_.keys(Navigation.store.propsById))

        const screenId =
          activeScreenName === routes.sideMenu ? prevScreenId : componentId

        navigation.push(screenId, route, props)
      }
      this.setSidebarVisible(false)
    } catch (err) {
      this.handleShowToastify('error')
      Navigation.popToRoot(componentId)
    }
  }

  handleGoBack = () => {
    const { componentId } = this.props

    navigation.pop(componentId)
  }

  handleOpenModal = (route, props) => {
    navigation.showModal(route, props)
    this.setSidebarVisible(false)
  }

  handleCloseModal = () => {
    const { componentId } = this.props

    navigation.closeModal(componentId)
    this.setSidebarVisible(false)
  }

  handlePopTo = screenId => {
    navigation.popTo(screenId)
  }

  setSidebarVisible = visible => {
    const { isModal } = this.props
    if (!isModal) this.setState({ isOpenDrawer: visible })
  }

  handleShowToastify = (text, time = 3000, type) => {
    if (!_.isFunction(_.get(this, 'toastifySuccess.show'))) return

    if (type === 'success') this.toastifySuccess.show(text, time)
    else this.toastifyError.show(text, time)
  }

  handleCheckClose = bool => {
    if (!bool) this.setState({ isOpenDrawer: false })
  }

  componentDidAppear({ componentName }) {
    const { onChangeNavigation, activeScreenName } = this.props

    if (activeScreenName !== componentName) onChangeNavigation(componentName)
  }

  render() {
    const {
      Component,
      activeScreenName,
      isDisableSideMenu,
      isModal,
    } = this.props
    const { isOpenDrawer } = this.state

    const props = _.omit(this.props, config.removedPropsKeys)

    return (
      <>
        <Drawer
          edgeHitWidth={metrics.getWindowWidth(30)}
          isOpen={isOpenDrawer}
          disableGestures={isDisableSideMenu || isModal}
          onChange={this.handleCheckClose}
          menu={
            <SideMenu
              componentId="drawer"
              onClose={() => this.setSidebarVisible(false)}
            />
          }
        >
          <Wrapper>
            <AdsWrapper
              navigationProps={{
                screenId: activeScreenName,
                navigate: {
                  push: this.handlePush,
                  pop: this.handleGoBack,
                  showModal: this.handleOpenModal,
                  hideModal: this.handleCloseModal,
                  showSidebar: () => this.setSidebarVisible(true),
                  popTo: this.handlePopTo,
                  setupRoot,
                  showMessage: this.handleShowToastify,
                  mergeOptions: this.handleMergeOptions,
                },
              }}
              Component={Component}
              {...props}
            />
          </Wrapper>
          <Toast ref={e => (this.toastifyError = e)} {...styles.ToastError} />
          <Toast
            ref={e => (this.toastifySuccess = e)}
            {...styles.ToastSuccess}
          />
        </Drawer>
      </>
    )
  }
}

const actions = {
  onChangeNavigation: setNavigation,
}

const selectors = createStructuredSelector({
  activeScreenName: getActiveScreenName,
  isRequest: getUserRequestInfo,
})

export default compose(
  connect(
    selectors,
    actions,
  ),
  withOrientation,
)(WithNavigate)
