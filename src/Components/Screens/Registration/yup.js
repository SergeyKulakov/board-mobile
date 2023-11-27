import { object, string, ref } from 'yup'
import { phoneNumber } from 'Constants/regExp'

export const yupConfig = () =>
  object().shape({
    email: string()
      .email('validEmail')
      .required('email'),
    userId: string().required('userId'),
    password: string()
      .required('password')
      .min(8, 'passwordLength')
      .matches(/[a-z]/, 'passwordLowerCase')
      .matches(/[A-Z]/, 'passwordUpperCase')
      .matches(/[0-9]/, 'passwordNumber')
      .matches(/[a-zA-Z0-9]+$/, 'passwordLatin'),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'passwordsDoNotMuch')
      .required('passwordConfirm'),
    mobileNumber: string()
      .matches(phoneNumber, 'numbers')
      .required('numbers'),
  })
