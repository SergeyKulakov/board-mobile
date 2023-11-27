import { object, string } from 'yup'

export const yupConfig = object().shape({
  email: string().required('userId'),
  password: string()
    .min(8, 'passwordLength')
    .matches(/[a-z]/, 'passwordLowerCase')
    .matches(/[A-Z]/, 'passwordUpperCase')
    .matches(/[0-9]/, 'passwordNumber')
    .matches(/[a-zA-Z0-9]+$/, 'passwordLatin')
    .required('password'),
})
