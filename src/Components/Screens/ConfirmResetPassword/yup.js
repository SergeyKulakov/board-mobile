import { object, string, ref } from 'yup'
import { passwordReg } from 'Constants/regExp'

export const yupConfig = object().shape({
  code: string().required(),
  password: string()
    .matches(passwordReg, 'password is invalid')
    .min(8)
    .required(),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'error')
    .required(),
})
