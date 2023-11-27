import i18n from 'I18N'

export const getText = () => ({
  checkError: i18n.t('profilePage.errorTerms'),
  signIn: i18n.t('sign.SignIn'),
})

export const initialValues = {
  email: '',
  userId: '',
  password: '',
  confirmPassword: '',
  mobileNumber: '+1',
  isAgree: false,
}
