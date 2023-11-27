import { object, string } from 'yup'
import { phoneNumber } from 'Constants/regExp'

export const yupConfig = object().shape({
  value: string()
    .test('phoneNumber', 'numbers', value => {
      if (Number(value)) {
        return phoneNumber.test(value)
      }
      return true
    })
    .required('userId'),
})
