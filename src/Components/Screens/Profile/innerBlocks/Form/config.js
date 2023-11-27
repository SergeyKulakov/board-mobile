import i18n from 'I18N'
import {
  phoneNumber as isPhoneNumber,
  email as isEmail,
} from 'Constants/regExp'

export function validation({
  firstName,
  lastName,
  email,
  isPro,
  certificates,
  defaultRadius,
  phoneNumber,
}) {
  if (Number.isNaN(Number(defaultRadius))) {
    // todo scroll to radius
    // todo need translate
    // return {
    //   status: false,
    //   message: i18n.t('Profile.GeneralInfo.radiusIsNotValid'),
    // }
  }

  if (isPro && !certificates.length) {
    // todo scroll to certificates
    return {
      status: false,
      type: 'areYouPro',
      message: i18n.t(
        'profilePage.fields.AreYouPro.validationErrors.noCertificates',
      ),
    }
  }

  if (!firstName) {
    // todo scroll to name
    return {
      status: false,
      message: i18n.t('profilePage.fields.firstName.validationErrors.required'),
    }
  }

  if (!lastName) {
    return {
      status: false,
      message: i18n.t('profilePage.fields.lastName.validationErrors.required'),
    }
  }

  if (!email) {
    return {
      status: false,
      message: i18n.t('profilePage.fields.email.validationErrors.required'),
    }
  }

  if (!isEmail.test(email)) {
    return {
      status: false,
      message: i18n.t('sign.validation.validEmail'),
    }
  }

  if (!phoneNumber) {
    return {
      status: false,
      message: i18n.t(
        'profilePage.fields.phoneNumber.validationErrors.required',
      ),
    }
  }

  if (!isPhoneNumber.test(phoneNumber)) {
    return {
      status: false,
      message: i18n.t('sign.WrongPhoneNumberFormat'),
    }
  }

  return {
    status: true,
  }
}
