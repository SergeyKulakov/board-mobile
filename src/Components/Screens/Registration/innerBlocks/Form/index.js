import React from 'react'
import PropTypes from 'prop-types'

import { InputBlock, Button } from 'Components/UI'
import { SocialAuthBlock, LicenseAgreement } from 'Components/Blocks'
import { getI18nText } from './config'
import { Container, Block } from './style'

const Form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  handleSubmit,
  isLoading,
  toast,
  onOpenPhoneModal,
}) => {
  const text = getI18nText()

  return (
    <Container>
      <Block>
        <InputBlock
          animatedLabel
          animatedLine
          errorMessage={
            touched.email && errors.email && text.getError(errors.email)
          }
          label={text.email}
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          onSetTouched={() => setFieldTouched('email')}
        />
      </Block>
      <Block>
        <InputBlock
          animatedLabel
          animatedLine
          errorMessage={
            touched.userId && errors.userId && text.getError(errors.userId)
          }
          label={text.userId}
          value={values.userId}
          onChange={handleChange('userId')}
          onBlur={handleBlur('userId')}
          onSetTouched={() => setFieldTouched('userId')}
        />
      </Block>
      <Block>
        <InputBlock
          animatedLabel
          animatedLine
          isSecure
          errorMessage={
            touched.password &&
            errors.password &&
            text.getError(errors.password)
          }
          label={text.password}
          value={values.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          onSetTouched={() => setFieldTouched('password')}
        />
      </Block>
      <Block>
        <InputBlock
          animatedLabel
          animatedLine
          isSecure
          errorMessage={
            touched.confirmPassword &&
            errors.confirmPassword &&
            text.getError(errors.confirmPassword)
          }
          label={text.confirmPassword}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          onSetTouched={() => setFieldTouched('confirmPassword')}
        />
      </Block>
      <Block>
        <InputBlock
          animatedLine
          onOpenPhoneModal={onOpenPhoneModal}
          errorMessage={
            touched.mobileNumber &&
            errors.mobileNumber &&
            text.getError(errors.mobileNumber)
          }
          label={text.mobileNumber}
          value={values.mobileNumber}
          onChange={handleChange('mobileNumber')}
          onBlur={handleBlur('mobileNumber')}
          onSetTouched={() => setFieldTouched('mobileNumber')}
        />
      </Block>
      <Block>
        <SocialAuthBlock toast={toast} />
      </Block>
      <Block pt={50}>
        <LicenseAgreement
          onSuccess={() => setFieldValue('isAgree', true)}
          onChange={() => setFieldValue('isAgree', !values.isAgree)}
          value={values.isAgree}
        />
      </Block>
      <Block pb={3}>
        <Button text={text.signUp} onClick={handleSubmit} loading={isLoading} />
      </Block>
    </Container>
  )
}

Form.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
  onOpenPhoneModal: PropTypes.func,
}

export { Form }
