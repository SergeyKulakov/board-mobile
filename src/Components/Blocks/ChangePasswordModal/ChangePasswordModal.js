import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { hitSlop } from 'Constants/hitSlop'

import { Modal, TouchableWithoutFeedback } from 'react-native'
import { InputBlock, Button } from 'Components/UI'

import {
  Container,
  Title,
  TitleWrapper,
  Content,
  InfoText,
  InputWrapper,
  ButtonsWrapper,
  Overlay,
  buttons,
  ForgotPasswordLinkWrapper,
  ForgotPasswordLink,
} from './style'

class ChangePasswordModal extends PureComponent {
  state = {
    currentPassword: '',
    newPassword: '',
    isRootScreen: true,
    isRequest: false,
    isError: false,
  }

  handleChange = password => {
    const { isRootScreen } = this.state
    this.setState({
      [isRootScreen ? 'currentPassword' : 'newPassword']: password,
      isError: !password,
    })
  }

  handleVerify = () => {
    const { currentPassword } = this.state

    if (!currentPassword) {
      this.setState({ isError: true })
      return
    }

    this.setState({ isRootScreen: false })
  }

  handleSubmit = () => {
    const { onClose, onSubmit, getError, onShowPuck } = this.props
    const { currentPassword, newPassword } = this.state
    this.setState({ isRequest: true })

    onSubmit(currentPassword, newPassword, ({ error }) => {
      if (error) {
        onShowPuck({
          type: 'error',
          message: getError(error),
        })
      } else {
        this.setState(
          {
            isRequest: false,
            currentPassword: '',
            newPassword: '',
            isRootScreen: true,
          },
          () => onClose(true),
        )
      }
    })
  }

  handleClose = () => {
    const { onClose } = this.props

    this.setState(
      { currentPassword: '', newPassword: '', isRootScreen: true },
      onClose,
    )
  }

  handleForgotPasswordClick = () => {
    const { onForgotPasswordClick } = this.props
    onForgotPasswordClick()
  }

  render() {
    const { t, isVisible } = this.props
    const {
      isRootScreen,
      currentPassword,
      newPassword,
      isRequest,
      isError,
    } = this.state

    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent
        onRequestClose={this.handleClose}
        supportedOrientations={['portrait', 'landscape']}
      >
        <TouchableWithoutFeedback
          onPress={this.handleClose}
          disabled={!isVisible}
        >
          <Overlay>
            <TouchableWithoutFeedback>
              <Container>
                <TitleWrapper>
                  <Title>
                    {isRootScreen
                      ? t('settings.currentPassword')
                      : t('settings.newPassword')}
                  </Title>
                </TitleWrapper>
                <Content>
                  {isRootScreen ? (
                    <InfoText>{t('settings.verifyPassword')}</InfoText>
                  ) : null}
                  <InputWrapper>
                    <InputBlock
                      testID="changeInput"
                      value={isRootScreen ? currentPassword : newPassword}
                      onChange={this.handleChange}
                      animatedLine
                      autoFocus
                      isSecure
                      label={
                        isRootScreen
                          ? t('settings.password')
                          : t('settings.newPassword')
                      }
                      placeholder={t('deleteAccountScreen.typeHere')}
                      errorMessage={
                        isError && 'Enter your current password please'
                      }
                    />
                    <ForgotPasswordLinkWrapper
                      testID="forgotPassTouchableField"
                      hitSlop={hitSlop}
                      onPress={this.handleForgotPasswordClick}
                    >
                      <ForgotPasswordLink>
                        {t('sign.ForgotPass')}
                      </ForgotPasswordLink>
                    </ForgotPasswordLinkWrapper>
                  </InputWrapper>
                  <ButtonsWrapper>
                    <Button
                      fieldStyle={buttons.default}
                      style={{
                        gradient: buttons.cancel,
                      }}
                      linear
                      onClick={this.handleClose}
                    >
                      {t('settings.cancel')}
                    </Button>
                    <Button
                      fieldStyle={buttons.default}
                      style={buttons.success}
                      linear
                      loading={isRequest}
                      onClick={
                        isRootScreen ? this.handleVerify : this.handleSubmit
                      }
                    >
                      {isRootScreen ? t('settings.verify') : t('sign.submit')}
                    </Button>
                  </ButtonsWrapper>
                </Content>
              </Container>
            </TouchableWithoutFeedback>
          </Overlay>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

ChangePasswordModal.propTypes = {
  t: PropTypes.func,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onForgotPasswordClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onShowPuck: PropTypes.func,
  getError: PropTypes.func,
}

export default ChangePasswordModal
