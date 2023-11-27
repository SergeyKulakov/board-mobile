import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'
import { metrics } from 'Themes'
import { isIos } from 'Helpers/iphoneX'

import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import {
  LanguageModal,
  SocialAuthBlock,
  LanguageButton,
  SignInForm,
} from 'Components/Blocks'
import { GradientContainer } from 'Components/UI'

import { Footer } from './innerBlocks'
import {
  Title,
  Content,
  FormContainer,
  FooterContainer,
  Container,
  Header,
  ScrollContent,
} from './style'

class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeLanguage: props.getCurrentLanguage('type'),
      isModalOpen: false,
      isRequest: false,
    }
  }

  handleCloseLanguagesModal = () => this.setState({ isModalOpen: false })

  handleOpenLanguagesModal = () => this.setState({ isModalOpen: true })

  handleChangeLanguage = language => this.setState({ activeLanguage: language })

  handleSetLanguage = () => {
    const { onSetLanguage, getCurrentLanguage } = this.props
    const { activeLanguage } = this.state

    if (getCurrentLanguage('type') !== activeLanguage) {
      onSetLanguage(activeLanguage)
      this.handleCloseLanguagesModal()
    }
  }

  handleSignIn = ({ email, password, isRemember }) => {
    const {
      onSignIn,
      navigate,
      getError,
      onShowPuck,
      isKeyboardShow,
      onCloseKeyboard,
    } = this.props

    if (isKeyboardShow) onCloseKeyboard()

    this.setState({ isRequest: true })

    onSignIn({
      email,
      password,
      isRemember,
      callback: ({ error }) => {
        this.setState({ isRequest: false }, () => {
          if (error) {
            if (_.get(error, 'payload.code') === 'UserNotConfirmedException') {
              navigate.push(routes.confirmSignUp, {
                editable: true,
                userName: email,
              })
            } else {
              onShowPuck({
                type: 'error',
                message: getError(error),
                delay: 3000,
              })
            }
          } else navigate.setupRoot(true)
        })
      },
    })
  }

  handleOpenChangePasswordScreen = () => {
    const { navigate } = this.props

    navigate.push(routes.forgotPass)
  }

  _renderContent = () => {
    const { navigate } = this.props
    const { isRequest } = this.state

    return (
      <Content>
        <FormContainer>
          <SignInForm
            onSignIn={this.handleSignIn}
            isLoading={isRequest}
            onForgotClick={this.handleOpenChangePasswordScreen}
          />
        </FormContainer>
        <SocialAuthBlock toast={navigate.showMessage} />
      </Content>
    )
  }

  render() {
    const {
      navigate,
      isNotRootScreen,
      getCurrentLanguage,
      t,
      isKeyboardShow,
      onCloseKeyboard,
    } = this.props
    const { isModalOpen, activeLanguage } = this.state

    return (
      <GradientContainer>
        <Container>
          <KeyboardAvoidingView
            behavior={isIos() ? 'padding' : 'height'}
            enabled
            style={{ flex: 1 }}
          >
            <Header>
              <Title>{t('sign.spotJobs')}</Title>
              <LanguageButton
                flagName={getCurrentLanguage('flag')}
                onClick={this.handleOpenLanguagesModal}
              />
            </Header>
            <TouchableWithoutFeedback
              onPress={onCloseKeyboard}
              disabled={!isKeyboardShow}
            >
              {metrics.getWindowHeight() < 650 ? (
                <ScrollContent>{this._renderContent()}</ScrollContent>
              ) : (
                this._renderContent()
              )}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

          <FooterContainer>
            <Footer
              onSignUpClick={() =>
                isNotRootScreen
                  ? navigate.pop()
                  : navigate.push(routes.singUp, {
                      isHideButton: false,
                      isNotRootScreen: true,
                    })
              }
            />
          </FooterContainer>
        </Container>

        <LanguageModal
          activeLanguage={activeLanguage}
          visible={isModalOpen}
          onCloseModal={this.handleCloseLanguagesModal}
          onChangeLanguage={this.handleChangeLanguage}
          onSetLanguage={this.handleSetLanguage}
        />
      </GradientContainer>
    )
  }
}

Login.propTypes = {
  isNotRootScreen: PropTypes.bool,
  navigate: PropTypes.object,
  onSetLanguage: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  t: PropTypes.func,
  getCurrentLanguage: PropTypes.func,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
  isKeyboardShow: PropTypes.bool,
  onCloseKeyboard: PropTypes.func,
}

export default Login
