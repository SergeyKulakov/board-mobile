import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setupRoot } from 'Navigation'

import { TouchableWithoutFeedback } from 'react-native'
import { Formik } from 'formik'
import {
  InputBlock,
  ScreenHeader,
  Button,
  BackIcon,
  ScreenTitle,
} from 'Components/UI'

import {
  Container,
  Content,
  FormBlock,
  ButtonBlock,
  HeaderBlock,
  UserNameInfo,
  Block,
  ResendButtonContainer,
  EditableInputContainer,
  styles,
} from './style'

class ConfirmSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: props.userName || '',
      isResendRequest: Boolean(props.editable),
    }
  }

  componentDidMount() {
    const { onResendCode, editable } = this.props
    const { userName } = this.state

    if (editable)
      onResendCode(userName, ({ error }) => {
        if (error) this.handleError(error)
        this.setState({ isResendRequest: false })
      })
  }

  handleUserNameChange = text => this.setState({ userName: text })

  handleError = error => {
    const { getError, onShowPuck } = this.props

    onShowPuck({
      type: 'error',
      message: getError(error),
      delay: 3000,
    })
  }

  handleSendCode = ({ code }) => {
    const { onSendConfirmCode } = this.props
    const { userName } = this.state
    onSendConfirmCode(code, userName, ({ error }) => {
      if (error) this.handleError(error)
      else setupRoot(false)
    })
  }

  handleResendConfirmCode = () => {
    const { onResendCode, onShowPuck } = this.props
    const { userName } = this.state
    this.setState({ isResendRequest: true })
    onResendCode(userName, ({ error }) => {
      this.setState({ isResendRequest: false })
      if (error) this.handleError(error)
      else onShowPuck()
    })
  }

  render() {
    const {
      loadInfo,
      navigate,
      editable,
      isKeyboardShow,
      onCloseKeyboard,
      t,
    } = this.props
    const { userName, isResendRequest } = this.state

    return (
      <TouchableWithoutFeedback
        onPress={onCloseKeyboard}
        disabled={!isKeyboardShow}
      >
        <Container>
          <ScreenHeader>
            <HeaderBlock>
              <Block>
                <BackIcon onClick={navigate.pop} />
              </Block>
              <Block flex={4}>
                <ScreenTitle style={styles.Title}>
                  {t('profilePage.confirmCode')}
                </ScreenTitle>
              </Block>
              <Block />
            </HeaderBlock>
          </ScreenHeader>
          <Content>
            {editable ? null : (
              <UserNameInfo>
                {t('profilePage.verifyAttributeModal.description.email')}
              </UserNameInfo>
            )}
            <Formik
              initialValues={{ code: '' }}
              onSubmit={this.handleSendCode}
              render={props => (
                <FormBlock>
                  {editable ? (
                    <EditableInputContainer>
                      <InputBlock
                        value={userName}
                        animatedLabel
                        animatedLine
                        label={t('sign.UserName')}
                        onChange={this.handleUserNameChange}
                      />
                    </EditableInputContainer>
                  ) : null}
                  <InputBlock
                    value={props.values.code}
                    animatedLabel
                    animatedLine
                    autoFocus={!editable}
                    label={t('sign.code')}
                    onChange={props.handleChange('code')}
                    onBlur={props.handleBlur('code')}
                  />
                  <ButtonBlock>
                    <ResendButtonContainer>
                      <Button
                        text={t('sign.resendCode')}
                        onClick={this.handleResendConfirmCode}
                        loading={isResendRequest}
                      />
                    </ResendButtonContainer>
                    <Button
                      text={t('sign.submit')}
                      onClick={props.handleSubmit}
                      loading={loadInfo.loading}
                    />
                  </ButtonBlock>
                </FormBlock>
              )}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}

ConfirmSignUp.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  navigate: PropTypes.object.isRequired,
  onSendConfirmCode: PropTypes.func.isRequired,
  userName: PropTypes.string,
  loadInfo: PropTypes.object.isRequired,
  onResendCode: PropTypes.func,
  isKeyboardShow: PropTypes.bool,
  onCloseKeyboard: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
}

export default ConfirmSignUp
