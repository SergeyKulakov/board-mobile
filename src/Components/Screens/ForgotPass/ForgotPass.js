import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as routes from 'Constants/routes'
import _ from 'lodash'

import { Formik } from 'formik'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import {
  InputBlock,
  Button,
  ScreenHeader,
  BackIcon,
  ScreenTitle,
} from 'Components/UI'

import { yupConfig } from './yup'
import {
  Header,
  Content,
  Block,
  Container,
  InputContainer,
  Middle,
  styles,
} from './style'

class ForgotPass extends PureComponent {
  state = {
    isRequest: false,
  }

  handleSubmit = ({ value }) => {
    const { onForgotPass, onShowPuck, getError, navigate } = this.props
    this.setState({ isRequest: true })

    onForgotPass({
      value: _.trim(value),
      callback: ({ error }) => {
        this.setState({ isRequest: false }, () => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
              delay: 3000,
            })
          } else {
            navigate.showModal(routes.confirmResetPassword, {
              userName: _.trim(value),
              onSuccess: () => {
                onShowPuck({
                  callback: navigate.pop,
                })
              },
            })
          }
        })
      },
    })
  }

  renderForm = ({
    values,
    touched,
    errors,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
  }) => {
    const { t } = this.props
    const { isRequest } = this.state

    return (
      <>
        <InputContainer>
          <InputBlock
            animatedLabel
            animatedLine
            errorMessage={
              touched.value &&
              errors.value &&
              t(`sign.validation.${errors.value}`)
            }
            onChange={handleChange('value')}
            onBlur={handleBlur('value')}
            onSetTouched={() => setFieldTouched('value')}
            value={values.value}
            label={t('sign.forgotId')}
            onEndEditing={handleSubmit}
          />
        </InputContainer>
        <Button
          text={t('sign.submit')}
          onClick={handleSubmit}
          loading={isRequest}
        />
      </>
    )
  }

  render() {
    const { navigate, t, username } = this.props

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ScreenHeader>
            <Header>
              <Block>
                <BackIcon onClick={navigate.pop} />
              </Block>
              <Middle>
                <ScreenTitle style={styles.Title}>
                  {t('sign.ForgotPass')}
                </ScreenTitle>
              </Middle>
            </Header>
          </ScreenHeader>
          <Content>
            <Formik
              initialValues={{ value: username || '' }}
              validationSchema={yupConfig}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}

ForgotPass.propTypes = {
  navigate: PropTypes.object,
  onForgotPass: PropTypes.func,
  t: PropTypes.func,
  onShowPuck: PropTypes.func,
  getError: PropTypes.func,
  username: PropTypes.string,
}

export default ForgotPass
