import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { Button, InputBlock, Checkbox } from 'Components/UI'

import {
  Container,
  ButtonContainer,
  ForgotLink,
  InputContainer,
  FormContainer,
  CheckBoxContainer,
} from './style'

const SingInForm = ({
  isLoading,
  t,
  values,
  touched,
  errors,
  onForgotClick,
  handleSubmit,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
}) => (
  <Container>
    <FormContainer>
      <InputContainer>
        <InputBlock
          animatedLabel
          animatedLine
          value={values.email}
          label={t('sign.EmailID')}
          errorMessage={
            touched.email &&
            errors.email &&
            t(`sign.validation.${errors.email}`)
          }
          onChange={value => setFieldValue('email', value)}
          onBlur={handleBlur('email')}
          onSetTouched={() => setFieldTouched('email')}
        />
      </InputContainer>
      <InputContainer pt={15} mt={15}>
        <InputBlock
          animatedLabel
          animatedLine
          isSecure
          value={values.password}
          label={t('sign.Password')}
          errorMessage={
            touched.password &&
            errors.password &&
            t(`sign.validation.${errors.password}`)
          }
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          onSetTouched={() => setFieldTouched('password')}
        />
      </InputContainer>
      <CheckBoxContainer>
        <Checkbox
          checked={values.isRemember}
          text={t('sign.RememberMe')}
          onChange={() => setFieldValue('isRemember', !values.isRemember)}
        />
      </CheckBoxContainer>
      <ButtonContainer>
        <Button
          text={t('sign.SignIn')}
          onClick={handleSubmit}
          loading={isLoading}
        />
      </ButtonContainer>
    </FormContainer>

    <TouchableOpacity testID="forgot" onPress={onForgotClick}>
      <ForgotLink>{t('sign.ForgotPass')}</ForgotLink>
    </TouchableOpacity>
  </Container>
)

SingInForm.propTypes = {
  errors: PropTypes.any,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool,
  onForgotClick: PropTypes.func,
  onSignIn: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  t: PropTypes.func,
  touched: PropTypes.any,
  values: PropTypes.object,
}

export default SingInForm
