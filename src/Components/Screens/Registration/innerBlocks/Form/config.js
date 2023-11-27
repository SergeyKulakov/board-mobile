import i18n from 'I18N'

export const getI18nText = () => ({
  email: i18n.t('sign.EnterYourEmail'),
  userId: i18n.t('sign.UserName'),
  password: i18n.t('sign.Password'),
  confirmPassword: i18n.t('sign.ConfirmPass'),
  mobileNumber: i18n.t('sign.EnterYourMobileNumber'),
  iAgreeToThe: i18n.t('sign.IAgree'),
  link: i18n.t('sign.TermsAndConditions'),
  signUp: i18n.t('sign.SignUp'),
  getError: key => i18n.t(`sign.validation.${key}`),
})
