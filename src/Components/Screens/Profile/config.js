import i18n from 'I18N'
import _ from 'lodash'
import moment from 'moment'
import { isBase64 } from 'Helpers/isBase64'
import { transformImages } from 'Helpers/images'

export const getText = () => ({
  signUp: i18n.t('profilePage.saveBtnLabel'),
  isProvider: i18n.t('profilePage.fields.isProvider.label'),
  firstName: i18n.t('profilePage.fields.firstName.label'),
  lastName: i18n.t('profilePage.fields.lastName.label'),
  email: i18n.t('profilePage.fields.email.label'),
  phoneNumber: i18n.t('sign.MobileNumber'),
  datePickerLabel: i18n.t('profilePage.fields.birthdate.label'),
  defaultRadius: i18n.t('profilePage.DefaultRadius'),
  cityLabel: i18n.t('profilePage.fields.city.label'),
  stateLabel: i18n.t('profilePage.fields.state.label'),
  zipCodeLabel: i18n.t('profilePage.fields.zipCode.label'),
  buttonText: i18n.t('profilePage.saveBtnLabel'),
  countryLabel: i18n.t('profilePage.fields.country.label'),
  iAgreeToThe: i18n.t('profilePage.Agree'),
  LinkIAgreeToThe: i18n.t('sign.termsCond'),
  datePickerSubInfo: i18n.t('profilePage.fields.firstName.label'),
  serviceScreenTitle: i18n.t('profilePage.fields.services.label'),
  addServiceBtn: i18n.t('profilePage.fields.services.addButtonLabel'),
  streetAddress: i18n.t('profilePage.fields.address.label'),
  servicesLengthError: i18n.t('profilePage.overflowError'),
  verify: i18n.t('sign.verify').toUpperCase(),
  phoneVerify: i18n.t('sign.phoneVerify'),
  emailVerify: i18n.t('sign.emailVerify'),
  aboutLabel: i18n.t('profilePage.fields.aboutYourself.label'),
  errorAddressLocated: i18n.t('profilePage.errorAddressLocated'),
  DatePicker: {
    label: i18n.t('profilePage.fields.birthdate.label'),
    SubInfoText: i18n.t('profilePage.fields.birthdate.bottomLabel'),
  },
  serviceItem: {
    getCategoryTitle: title => i18n.t(`services`)[title],
    active: i18n.t('profilePage.StatusActive'),
    disable: i18n.t('profilePage.StatusInactive'),
  },
  Certificates: {
    isPro: i18n.t('profilePage.fields.AreYouPro.label'),
    title: i18n.t('profilePage.fields.certificates.label'),
    areYouProInfo: i18n.t('profilePage.fields.AreYouPro.sublabel'),
    canPermError: i18n.t('profilePage.fields.certificates.cameraPermissions'),
    UploadImages: {
      certificatesLengthError: i18n.t('jobPost.overflowError'),
      photoLibPermError: i18n.t(
        'profilePage.fields.certificates.photoPermissions',
      ),
    },
  },
  PickOfWork: {
    picksOfWorkLengthErrorFree: i18n.t('profilePage.overflowError'),
    picksOfWorkLengthErrorPremium: i18n.t('profilePage.overflowError'),
    title: i18n.t('profilePage.fields.picsOfWork.label'),
    UploadImages: {
      certificatesLengthError: i18n.t('jobPost.overflowError'),
      photoLibPermError: i18n.t(
        'profilePage.fields.certificates.photoPermissions',
      ),
    },
  },
  PickUserId: {
    idPicksLengthError: i18n.t('profilePage.overflowError'),
    title: i18n.t('profilePage.fields.picsID.label'),
    subTitle: i18n.t('profilePage.fields.picsID.sublabel'),
    UploadImages: {
      certificatesLengthError: i18n.t('jobPost.overflowError'),
      photoLibPermError: i18n.t(
        'profilePage.fields.certificates.photoPermissions',
      ),
    },
  },
  Links: {
    videoLinksLengthError: i18n.t('profilePage.overflowError'),
    websiteLinksLengthErrorFree: i18n.t('profilePage.overflowError'),
    websiteLinksLengthErrorPremium: i18n.t('profilePage.overflowError'),
    videoLinkTitle: i18n.t('profilePage.fields.videoLinks.label'),
    websiteLinkTitle: i18n.t('profilePage.fields.websiteLinks.label'),
  },
})

export function getInitialValue(user) {
  const getImagesArray = items =>
    items.map((el, index) => ({ id: String(index), image: el }))

  const geolocation = user.geolocation ? user.geolocation.split('/') : ['', '']

  return {
    avatar: user.avatarURL,
    firstName: user.given_name,
    lastName: user.family_name,
    phoneNumber: user.phone_number || '+1',
    emailVerified: user.email_verified === 'true',
    phoneNumberVerified: user.phone_number_verified === 'true',
    email: user.email,
    isAgreedWithTerms: user.isAgreedWithTerms,
    defaultRadius: (user.defaultRadius && String(user.defaultRadius)) || '10',
    isPro: user.isPro || false,
    dateOfBirth: user.birthdate ? moment(user.birthdate).valueOf() : '',
    about: user.about,
    location: {
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zip,
      country: user.country,
      lat: geolocation[0],
      lon: geolocation[1],
    },
    isProvider: user.isProvider || false,
    services: user.services || [],
    certificates: user.certificates ? getImagesArray(user.certificates) : [],
    picsOfWork: user.picsOfWork ? getImagesArray(user.picsOfWork) : [],
    idPics: user.idPics ? getImagesArray(user.idPics) : [],
    videoLinks: user.videoLinks || [],
    websiteLinks: user.websiteLinks || [],
  }
}

export const getResultObject = (user, values) => {
  const { lat, lon, address, city, country, state, zipCode } = values.location

  const geolocation = lat && lon ? `${lat}/${lon}` : null
  let services = []

  if(!_.isEmpty(_.differenceWith(values.services, user.services, _.isEqual))) {
    services = values.services.map(el => ({
      serviceId: el.categoryId,
      _id: el._id,
      status: el.status,
    }))
  }

  const websiteLinks = values.websiteLinks.map(el => el.link)
  const videoLinks = values.videoLinks.map(el => el.link)
  const result = {}
  if (values.avatar && isBase64(values.avatar)) result.avatarB64 = values.avatar
  if (user.given_name !== values.firstName) result.firstName = values.firstName
  if (user.family_name !== values.lastName) result.lastName = values.lastName
  if (user.birthdate !== values.dateOfBirth && values.dateOfBirth !== '')
    result.birthdate = values.dateOfBirth
  if (user.email !== values.email) result.email = values.email
  if (user.phone_number !== values.phoneNumber)
    result.phoneNumber = values.phoneNumber
  if (user.isPro !== values.isPro) result.isPro = values.isPro
  if (user.isProvider !== values.isProvider)
    result.isProvider = values.isProvider
  if (user.geolocation !== geolocation) result.geolocation = geolocation
  if (user.address !== address) result.address = address
  if (String(user.defaultRadius) !== values.defaultRadius)
    result.defaultRadius = Number(values.defaultRadius)
  if (user.city !== city) result.city = city
  if (user.about !== values.about) result.aboutYourself = values.about
  if (user.country !== country) result.country = country
  if (user.state !== state) result.state = state
  if (user.zip !== zipCode) result.zip = zipCode
  const nextServices = services.map(el => ({
    categoryId: el.serviceId ? el.serviceId : el._id,
    serviceId: el.serviceId ? el._id : undefined,
    status: el.status,
  }))
  if (!_.isEqual(user.services, nextServices) && !_.isEmpty(nextServices)) {
    result.services = nextServices
  }
  if (!_.isEqual(user.websiteLinks, websiteLinks)) {
    result.websiteLinks = websiteLinks
  }

  if (
    !_.isEqual(
      user.videoLinks && user.videoLinks.map(el => el.link),
      videoLinks,
    )
  )
    result.videoLinks = videoLinks
  if (
    (values.certificates || []).some(el => isBase64(el.image)) ||
    (user.certificates || []).length !== values.certificates.length
  ) {
    result.certificates = transformImages(
      user.certificates,
      values.certificates,
    )
  }
  if (
    (values.picsOfWork || []).some(el => isBase64(el.image)) ||
    (user.picsOfWork || []).length !== values.picsOfWork.length
  ) {
    result.picsOfWork = transformImages(user.picsOfWork, values.picsOfWork)
  }
  if (
    (values.idPics || []).some(el => isBase64(el.image)) ||
    (user.idPics || []).length !== values.idPics.length
  ) {
    result.idPics = transformImages(user.idPics, values.idPics)
  }
  if (!user.isAgreedWithTerms) result.isAgreedWithTerms = true

  return result
}
