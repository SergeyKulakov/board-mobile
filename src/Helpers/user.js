import _ from 'lodash'
import memoize from 'memoize-one'
import { getAccessToken } from 'Redux/selectors/auth'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { getProfileImage } from './getImageUri'

export const getShortUserName = (givenName, familyName, text = '') => {
  if (!_.isString(givenName) || !_.isString(familyName)) return text

  return `${givenName} ${familyName[0].toUpperCase()}.`
}

export const isUSA = memoize(({ country }) => country === 'United States')

export const isSocialAccount = username => {
  if (!username || !_.isString(username)) return null

  return (
    username.startsWith('google_') ||
    username.startsWith('facebook_') ||
    username.startsWith('linkedin_')
  )
}

export const getPeopleWhoApplied = memoize((job, username) => {
  const list = _.get(job, 'peopleWhoApplied', [])
  if (_.get(job, 'author.username') !== username) return list

  return list.filter(el => el.userId !== username)
})

export const isMatchService = (job, { services: userServices }) => {
  let serviceId = job.service || job.category
  if (_.isObject(serviceId)) serviceId = serviceId._id

  return userServices.some(el => el._id === serviceId)
}

export const formatUserRequestParams = ({ params }, store) => ({
  params: {
    ...params,
    token: getAccessToken(store.getState()),
  },
})

export const getProfilePics = (
  picsOfWork = [],
  certificates = [],
  username,
) => {
  const nextPicsOfWork = picsOfWork.map(file =>
    getProfileImage({
      type: profileImageTypes.picsOfWork,
      src: file,
      userId: username,
    }),
  )

  const nextCertificates = certificates.map(file =>
    getProfileImage({
      type: profileImageTypes.certificates,
      src: file,
      userId: username,
    }),
  )

  return [...nextPicsOfWork, ...nextCertificates]
}
