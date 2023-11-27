import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
  Button,
  InputBlock,
  ScreenHeader,
  Icon,
  BackIcon,
  ScreenTitle,
} from 'Components/UI'

import { Formik } from 'formik'
import { initialValues, yupConfig } from './config'
import {
  Container,
  Block,
  ButtonBlock,
  Content,
  FormBlock,
  HeaderBlock,
  styles,
  UserNameInfo,
  ResentContainer,
  ResentText,
} from './style'

class ConfirmEditEmailOrPhone extends PureComponent {
  state = {
    loading: false,
    isResetCodeRequest: false,
  }

  componentDidMount() {
    const { isLoadCode } = this.props

    if (isLoadCode) this.handleResendClick()
  }

  handleSendCode = ({ code }) => {
    const { navigate, onSendConfirmCode, onSuccess, attributeName } = this.props

    this.setState({ loading: true })

    onSendConfirmCode({
      code,
      attributeName,
      callback: ({ error }) => {
        if (error) {
          navigate.showMessage(error.payload.message || error.payload)
        } else {
          navigate.hideModal()
          if (_.isFunction(onSuccess)) onSuccess()
        }

        this.setState({ loading: false })
      },
    })
  }

  handleResendClick = () => {
    const {
      onResendConfirmCode,
      attributeName,
      onShowPuck,
      getError,
    } = this.props

    this.setState({ isResetCodeRequest: true })

    onResendConfirmCode(attributeName, ({ error }) => {
      this.setState({ isResetCodeRequest: false }, () => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        } else onShowPuck()
      })
    })
  }

  renderForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  }) => {
    const { t } = this.props
    const { loading } = this.state

    return (
      <FormBlock>
        <InputBlock
          value={values.code}
          animatedLabel
          animatedLine
          label={t('profilePage.confirmCode')}
          onChange={handleChange('code')}
          onBlur={handleBlur('code')}
          onEndEditing={handleSubmit}
          errorMessage={touched.code && errors.code}
        />
        <ButtonBlock>
          <Button
            text={t('sign.submit')}
            onClick={handleSubmit}
            loading={loading}
          />
        </ButtonBlock>
      </FormBlock>
    )
  }

  handleClose = () => {
    const { navigate, onCancel } = this.props

    if (_.isFunction(onCancel)) onCancel()
    navigate.hideModal()
  }

  render() {
    const { userName, t } = this.props
    const { isResetCodeRequest } = this.state

    return (
      <Container>
        <ScreenHeader>
          <HeaderBlock>
            <Block>
              <BackIcon testID="backIcon" onClick={this.handleClose} />
            </Block>
            <Block flex={4}>
              <ScreenTitle style={styles.Title}>
                {t('profilePage.verifyEmailPhone')}
              </ScreenTitle>
            </Block>
            <Block />
          </HeaderBlock>
        </ScreenHeader>
        <Content>
          <UserNameInfo>{`${t(
            'profilePage.verificationCodeSend',
          )}: ${userName}`}</UserNameInfo>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSendCode}
            validationSchema={yupConfig}
            render={this.renderForm}
          />
          <ResentContainer>
            <ResentText>{t('sign.resendCode')}</ResentText>
            <Icon
              testID="resetButton"
              {...styles.ResentIcon}
              loading={isResetCodeRequest}
              onClick={this.handleResendClick}
            />
          </ResentContainer>
        </Content>
      </Container>
    )
  }
}

ConfirmEditEmailOrPhone.propTypes = {
  navigate: PropTypes.object.isRequired,
  onSendConfirmCode: PropTypes.func.isRequired,
  onResendConfirmCode: PropTypes.func.isRequired,
  attributeName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  onShowPuck: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
}

export default ConfirmEditEmailOrPhone
