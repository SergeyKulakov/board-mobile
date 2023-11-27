import { BACKET } from 'react-native-dotenv'
import ProfileImagesManager from 'Services/Images/ProfileImagesManager'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import _ from 'lodash'
import isUrl from 'is-url'

const s3 = 'https://s3.amazonaws.com'
const backet = BACKET
const serviceFolder = 'service-icons'
const jobsFolder = 'job-pics'

export const getServiceImage = fileName => {
  const iconName = fileName.replace(/\s/g, '%20')

  return `${s3}/${backet}/${serviceFolder}/${iconName}`
}

export const getJobImage = (id, fileName) =>
  `${s3}/${backet}/${jobsFolder}/${id}/${fileName}`

export const getProfileImage = ({ type, src, userId }) => {
  let source = src

  if (_.isString(src)) {
    if (/(data:image\/.*?;base64),/g.exec(src) || src.startsWith('http')) {
      source = src
    } else {
      source = ProfileImagesManager.getSignedURLForProfileImage(
        type,
        src,
        userId,
      )
    }
  } else if (_.isObject(src)) {
    source = null
  }

  return source
}

export const getProfileAvatar = (avatarURL, userId) => {
  if (isUrl(avatarURL)) return avatarURL

  if (_.isString(avatarURL)) {
    return getProfileImage({
      type: profileImageTypes.avatar,
      src: avatarURL,
      userId,
    })
  }

  return null
}
