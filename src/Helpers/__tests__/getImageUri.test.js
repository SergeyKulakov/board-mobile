import {
  getJobImage,
  getProfileAvatar,
  getProfileImage,
  getServiceImage,
} from '../getImageUri'

describe('Helpers/getImageUri', () => {
  it('getJobImage', () => {
    const id = 'someID'
    const fileName = 'file'

    const result = getJobImage(id, fileName)

    expect(result).toStrictEqual(
      'https://s3.amazonaws.com/spotjobs-images-097579889258-us-east-1/job-pics/someID/file',
    )
  })

  describe('getProfileAvatar', () => {
    it('with url link', () => {
      const avatarUrl = 'https://www.google.com'
      const userId = 'userId'

      const result = getProfileAvatar(avatarUrl, userId)

      expect(result).toStrictEqual(avatarUrl)
    })

    it('with remote image name', () => {
      const avatarUrl = 'some_avatar_file_name'
      const userId = 'userId'

      const result = getProfileAvatar(avatarUrl, userId)

      expect(result).toStrictEqual(avatarUrl)
    })

    it('invalid request', () => {
      const result = getProfileAvatar()

      expect(result).toBeNull()
    })
  })

  describe('getProfileImage', () => {
    it('with base64', () => {
      const request = {
        type: 'some type',
        src: 'data:image;base64:231djhlkjahe',
        userId: 'userId',
      }

      const result = getProfileImage(request)

      expect(result).toStrictEqual('data:image;base64:231djhlkjahe')
    })

    it('with remote file name', () => {
      const request = {
        type: 'some type',
        src: 'some_avatar_file_name',
        userId: 'userId',
      }

      const result = getProfileImage(request)

      expect(result).toStrictEqual('some_avatar_file_name')
    })

    it('should return null', () => {
      const request = {
        type: 'some type',
        src: {
          image: 'image',
        },
        userId: 'userId',
      }

      const result = getProfileImage(request)

      expect(result).toBeNull()
    })
  })

  it('getServiceImage', () => {
    const fileName = 'service_file_name'

    const result = getServiceImage(fileName)

    expect(result).toStrictEqual(
      'https://s3.amazonaws.com/spotjobs-images-097579889258-us-east-1/service-icons/service_file_name',
    )
  })
})
