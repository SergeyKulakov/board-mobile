import { object, string } from 'yup'

export const initialValues = {
  code: '',
}

export const yupConfig = object().shape({
  code: string()
    .min(6)
    .required(),
})
