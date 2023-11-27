import { object, string } from 'yup'
import { getTranslate } from 'Helpers/languages'
import { getServiceTitle } from 'Helpers/services'

export default {
  sections: {
    category: 0,
    location: 1,
    info: 6,
    dates: 7,
  },
}

export const getText = () => ({
  title: getTranslate('jobPost.title'),
  serviceTitle: getTranslate('jobPost.selectCategory'),
  getServiceTitle,
  Location: {
    title: getTranslate('jobPost.jobAddress'),
    subTitle: getTranslate('jobPost.infoBox'),
    street: getTranslate('jobPost.street'),
    city: getTranslate('jobPost.city'),
    state: getTranslate('jobPost.state'),
    zip: getTranslate('jobPost.zip'),
    country: getTranslate('jobPost.country'),
  },
  Details: {
    title: getTranslate('jobPost.details'),
    jobTitle: getTranslate('jobPost.jobTitle'),
    jobDescription: getTranslate('jobPost.jobDescription'),
    budget: getTranslate('jobPost.budget'),
    getError: key => getTranslate(`jobPost.validation.${key}`),
  },
  Dates: {
    title: getTranslate('jobPost.setDates'),
    doneBefore: getTranslate('jobPost.doneBefore'),
    expDate: getTranslate('jobPost.expDate'),
    getError: key => getTranslate(`jobPost.validation.${key}`),
    cancel: 'cancel',
    confirm: 'confirm',
  },
  pics: getTranslate('jobPost.uploadPics'),
  videoLinks: getTranslate('jobPost.videoLinks'),
  video: getTranslate('jobPost.video'),
  overflowError: getTranslate('jobPost.overflowError'),
  validation: {
    category: getTranslate('jobPost.validation.category'),
    title: getTranslate('jobPost.validation.title'),
    doneBefore: getTranslate('jobPost.validation.doneBefore'),
    expiryDate: getTranslate('jobPost.validation.expiryDate'),
    errorAddressLocated: getTranslate('jobPost.errorAddressLocated'),
  },
  cancel: getTranslate('jobPost.cancel'),
  postJobs: getTranslate('jobPost.postJobs'),
  updateJob: getTranslate('jobPost.updateJob'),
})

export const locationKeys = ['address', 'city', 'state', 'zipCode', 'country']
export const infoKeys = ['title', 'description', 'budget', 'currencyCode']
export const dateKeys = ['doneBefore', 'expiryDate']

const initialValues = {
  category: null,
  lat: '',
  lon: '',
  pics: [],
  videoLinks: [],
  isSuccess: false,
  isRequest: false,
}

locationKeys.forEach(el => {
  initialValues[el] = ''
})
infoKeys.forEach(el => {
  initialValues[el] = ''
})
dateKeys.forEach(el => {
  initialValues[el] = ''
})

initialValues.currencyCode = 'USD'

export { initialValues }

export const yupConfig = object().shape({
  category: string().required('category'),
  title: string().required('title'),
  doneBefore: string().required('doneBefore'),
  expiryDate: string().required('expiryDate'),
  lat: string().required(),
  lon: string().required(),
})
