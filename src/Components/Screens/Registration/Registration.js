import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import * as routes from 'Constants/routes'

import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native'
import { LanguageModal } from 'Components/Blocks'

import { Header, Form } from './innerBlocks'
import { yupConfig } from './yup'
import { initialValues, getText } from './config'
import { Container, Content, SignInLink } from './style'

class Registration extends PureComponent {
  state = {
    isModalOpen: false,
    activeLanguage: i18n.locale,
    text: getText(),
  }

  handleCloseLanguagesModal = () => this.setState({ isModalOpen: false })

  handleOpenLanguagesModal = () => this.setState({ isModalOpen: true })

  handleChangeLanguage = language => this.setState({ activeLanguage: language })

  handleSetLanguage = () => {
    const { onSetLanguage } = this.props
    const { activeLanguage } = this.state

    onSetLanguage(activeLanguage)
    this.setState({ text: getText() })
    this.handleCloseLanguagesModal()
  }

  handleOpenPhoneModal = () => {
    const { navigate } = this.props

    navigate.showModal(routes.phonesModal, {
      value: this.form.state.values.mobileNumber,
      onSubmit: phone => {
        this.form.setFieldValue('mobileNumber', phone)
      },
    })
  }

  handleSubmit = values => {
    const { onSignUp, navigate, onShowPuck, getError } = this.props
    const { text } = this.state

    if (!values.isAgree) {
      navigate.showMessage(text.checkError)
      return
    }

    const result = {
      userName: values.userId,
      password: values.password,
      email: values.email,
      phoneNumber: values.mobileNumber,
    }

    onSignUp({
      ...result,
      callback: ({ error }) => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            delay: 3000,
          })
        } else {
          navigate.push(routes.confirmSignUp, {
            userName: values.userId,
            title: values.email,
          })
        }
      },
    })
  }

  render() {
    const {
      navigate,
      isHideButton,
      isNotRootScreen,
      loadInfo,
      getCurrentLanguage,
    } = this.props
    const { isModalOpen, activeLanguage, text } = this.state

    return (
      <Container>
        <Header
          onArrowClick={navigate.pop}
          isHideButton={isHideButton}
          flagName={getCurrentLanguage('flag')}
          onClickLanguageButton={this.handleOpenLanguagesModal}
        />
        <KeyboardAwareScrollView>
          <Content>
            <Formik
              initialValues={initialValues}
              onSubmit={this.handleSubmit}
              ref={ref => (this.form = ref)}
              validationSchema={yupConfig}
              render={props => (
                <Form
                  {...props}
                  isLoading={loadInfo.loading}
                  toast={navigate.showMessage}
                  onSubmit={this.handleSubmit}
                  onOpenPhoneModal={this.handleOpenPhoneModal}
                />
              )}
            />
            <TouchableOpacity
              onPress={() =>
                isNotRootScreen
                  ? navigate.pop()
                  : navigate.push(routes.login, { isNotRootScreen: true })
              }
            >
              <SignInLink>{text.signIn}</SignInLink>
            </TouchableOpacity>
          </Content>
        </KeyboardAwareScrollView>
        <LanguageModal
          activeLanguage={activeLanguage}
          visible={isModalOpen}
          onCloseModal={this.handleCloseLanguagesModal}
          onChangeLanguage={this.handleChangeLanguage}
          onSetLanguage={this.handleSetLanguage}
        />
      </Container>
    )
  }
}

Registration.propTypes = {
  navigate: PropTypes.object,
  isNotRootScreen: PropTypes.bool,
  isShowButton: PropTypes.bool,
  loadInfo: PropTypes.object,
  isHideButton: PropTypes.bool,
  onSignUp: PropTypes.func,
  onSetLanguage: PropTypes.func,
  getCurrentLanguage: PropTypes.func,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
  t: PropTypes.func,
}

Registration.defaultProps = {
  isHideButton: true,
}

export default Registration
