import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { Header, Form } from './innerBlocks'
import { yupConfig } from './yup'
import { initialValues } from './config'
import { Container, Content } from './style'

class ConfirmResetPassword extends PureComponent {
  state = {
    isRequest: false,
  }

  handleSubmit = ({ code, password }) => {
    const {
      navigate,
      onResetPassword,
      userName,
      onShowPuck,
      getError,
      onSuccess,
    } = this.props

    this.setState({ isRequest: true })

    onResetPassword(
      { userName, password, confirmationCode: code },
      ({ error }) => {
        this.setState({ isRequest: false }, () => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
              delay: 3000,
            })
          } else {
            navigate.hideModal()
            onSuccess()
          }
        })
      },
    )
  }

  render() {
    const { userName, navigate, t } = this.props
    const { isRequest } = this.state

    return (
      <Container>
        <Header
          testID="header"
          onBackClick={navigate.hideModal}
          title={t('sign.ForgotPass')}
        />
        <Content>
          <Formik
            initialValues={initialValues}
            validationSchema={yupConfig}
            onSubmit={this.handleSubmit}
            render={props => (
              <Form {...props} userName={userName} loading={isRequest} />
            )}
          />
        </Content>
      </Container>
    )
  }
}

ConfirmResetPassword.propTypes = {
  userName: PropTypes.string,
  onResetPassword: PropTypes.func,
  navigate: PropTypes.object,
  onShowPuck: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  onSuccess: PropTypes.func,
}

export default ConfirmResetPassword
