import React from 'react'
import PropTypes from 'prop-types'

import withNamespaces from 'Components/HOC/withNamespaces'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { InputBlock, Button } from 'Components/UI'

import {
  Container,
  InputContainer,
  ButtonContainer,
  UserNameText,
} from './style'

const Form = ({
  userName,
  loading,
  values: { password, confirmPassword, code },
  errors,
  touched,
  setFieldTouched,
  handleSubmit,
  handleChange,
  handleBlur,
  t,
}) => {
  const isDisabledButton = Boolean(
    Object.keys(errors).length || !password || !confirmPassword || !code,
  )

  return (
    <KeyboardAwareScrollView>
      <Container>
        <UserNameText>{userName}</UserNameText>
        <InputContainer>
          <InputBlock
            label={t('sign.enterVerifyCode')}
            animatedLabel
            animatedLine
            onChange={handleChange('code')}
            onBlur={handleBlur('code')}
            errorMessage={touched.code && errors.code}
            onSetTouched={() => setFieldTouched('code')}
            value={code}
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            label={t('sign.Password')}
            animatedLabel
            animatedLine
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            errorMessage={touched.password && errors.password}
            onSetTouched={() => setFieldTouched('password')}
            value={password}
            isSecure
          />
        </InputContainer>
        <InputContainer>
          <InputBlock
            label={t('sign.ConfirmPass')}
            animatedLabel
            animatedLine
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            errorMessage={touched.confirmPassword && errors.confirmPassword}
            onSetTouched={() => setFieldTouched('confirmPassword')}
            value={confirmPassword}
            isSecure
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            text={t('sign.submit')}
            onClick={handleSubmit}
            disabled={isDisabledButton}
            loading={loading}
          />
        </ButtonContainer>
      </Container>
    </KeyboardAwareScrollView>
  )
}

Form.propTypes = {
  userName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  t: PropTypes.func,
}

export default withNamespaces(Form)
