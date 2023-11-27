import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import i18n from 'I18N'
import _ from 'lodash'
import * as routes from 'Constants/routes'
import { isSocialAccount } from 'Helpers/user'

import {
  SettingRow,
  LanguageModal,
  ChangePasswordModal,
} from 'Components/Blocks'
import { Header } from './innerBlocks'

import { Container, Content } from './style'

class Settings extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLanguageModalOpen: false,
      activeLanguage: i18n.locale,
      isChangePasswordModalOpen: false,
    }

    this.getNotifications = memoize(value => ({
      _id: '1',
      title: props.t('common.breadCrumbs.notifications'),
      value,
      onChange: this.handleChangeNotifications,
    }))
    this.getJobAlerts = memoize(value => ({
      _id: '2',
      title: props.t('settings.jobAlerts'),
      value,
      onChange: this.handleChangeJobAlerts,
    }))
    this.getChangePassword = memoize(() => ({
      _id: '3',
      title: props.t('settings.changePassword'),
      onClick: this.handleOpenPasswordModal,
    }))
    this.getAccountActive = memoize(value => ({
      _id: '4',
      title: props.t('settings.accountActive'),
      value,
      onChange: this.handleChangeAccountActive,
    }))

    this.getChangeLanguages = memoize(value => ({
      _id: '5',
      title: props.t('settings.changeLanguage'),
      subTitle: value,
      onClick: this.handleOpenLanguagesModal,
    }))

    this.getDeleteAccount = memoize(() => ({
      _id: '6',
      title: props.t('settings.deleteAccount'),
      onClick: this.handleDeleteAccountClick,
    }))
  }

  updateSettings = (key, value) => {
    const { onShowPuck, onUpdateSettings, getError } = this.props

    onUpdateSettings({ [key]: value }, ({ error }) => {
      onShowPuck({
        type: error ? 'error' : 'success',
        message: error ? getError(error) : null,
        delay: error ? 3000 : 1500,
      })
    })
  }

  handleChangeNotifications = bool => {
    const { onSetNotifications } = this.props

    onSetNotifications(bool)
  }

  handleChangeJobAlerts = bool => {
    const { onSetJobAlerts } = this.props

    onSetJobAlerts(bool)
  }

  handleChangeAccountActive = bool => {
    const { onSetAccountStatus } = this.props

    onSetAccountStatus(bool)
  }

  handleOpenLanguagesModal = () => this.setState({ isLanguageModalOpen: true })

  handleOpenPasswordModal = () => {
    const { user, onShowPuck, t } = this.props

    if (isSocialAccount(user.username)) {
      onShowPuck({
        type: 'warning',
        message: t('settings.cantChangePass'),
      })
    } else this.setState({ isChangePasswordModalOpen: true })
  }

  handleClosePasswordModal = isSubmit => {
    const { onShowPuck } = this.props
    if (_.isBoolean(isSubmit) && isSubmit) onShowPuck()
    this.setState({ isChangePasswordModalOpen: false })
  }

  handleCloseLanguagesModal = () =>
    this.setState({ isLanguageModalOpen: false })

  handleDeleteAccountClick = () => {
    const { navigate } = this.props

    navigate.showModal(routes.deleteMyAccount)
  }

  handleSetLanguage = () => {
    const { onSetLanguage } = this.props
    const { activeLanguage } = this.state

    onSetLanguage(activeLanguage)
    this.handleCloseLanguagesModal()
  }

  handleChangeLanguage = language => this.setState({ activeLanguage: language })

  handleOpenForgotPasswordScreen = () => {
    const { navigate, user } = this.props
    this.setState({ isChangePasswordModalOpen: false }, () => {
      navigate.push(routes.forgotPass, {
        username: user.username,
      })
    })
  }

  renderSettingRow = ({ item }) => <SettingRow {...item} />

  render() {
    const {
      settings,
      navigate,
      activeLanguage: savedActiveLanguage,
      getCurrentLanguage,
      t,
    } = this.props
    const { isChangePasswordModalOpen } = this.state

    const { isLanguageModalOpen, activeLanguage } = this.state

    const notifications = this.getNotifications(
      settings.notifications,
      savedActiveLanguage,
    )

    const jobAlerts = this.getJobAlerts(settings.jobAlerts, savedActiveLanguage)

    const changePassword = this.getChangePassword(savedActiveLanguage)

    const accountActive = this.getAccountActive(
      settings.accountActive,
      savedActiveLanguage,
    )

    const changeLanguage = this.getChangeLanguages(
      t(`languages.${getCurrentLanguage('name')}`),
      savedActiveLanguage,
    )

    const deleteAccount = this.getDeleteAccount(savedActiveLanguage)

    const data = [
      notifications,
      jobAlerts,
      changePassword,
      accountActive,
      changeLanguage,
      deleteAccount,
    ]

    return (
      <Container>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
        />
        <Content
          extraData={[settings, savedActiveLanguage]}
          keyExtractor={item => item._id}
          data={data}
          renderItem={this.renderSettingRow}
        />
        <LanguageModal
          visible={isLanguageModalOpen}
          activeLanguage={activeLanguage}
          onSetLanguage={this.handleSetLanguage}
          onCloseModal={this.handleCloseLanguagesModal}
          onChangeLanguage={this.handleChangeLanguage}
        />
        <ChangePasswordModal
          isVisible={isChangePasswordModalOpen}
          onClose={this.handleClosePasswordModal}
          onForgotPasswordClick={this.handleOpenForgotPasswordScreen}
        />
      </Container>
    )
  }
}

Settings.propTypes = {
  navigate: PropTypes.object,
  settings: PropTypes.object,
  onSetNotifications: PropTypes.func,
  onSetJobAlerts: PropTypes.func,
  onSetAccountStatus: PropTypes.func,
  onShowPuck: PropTypes.func,
  onSetLanguage: PropTypes.func,
  t: PropTypes.func,
  activeLanguage: PropTypes.string,
  getCurrentLanguage: PropTypes.func,
  getError: PropTypes.func,
  user: PropTypes.object,
}

export default Settings
