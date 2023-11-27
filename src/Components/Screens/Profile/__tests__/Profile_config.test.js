import moment from 'moment'

import 'jest-styled-components'

import { getInitialValue, getResultObject } from '../config'

const getImages = arr =>
  arr.map((el, index) => ({ id: String(index), image: el }))

describe('Profile.config', () => {
  const mockUser = {
    geolocation: '12.3124124123/32.3124123',
    avatarURL: 'avatarURL',
    given_name: 'given_name',
    family_name: 'family_name',
    phone_number: '1233214123',
    email_verified: 'true',
    phone_number_verified: 'true',
    email: 'some_email@email.com',
    isAgreedWithTerms: true,
    defaultRadius: '100',
    isPro: false,
    birthdate: 1570027491755,
    about: 'description',
    address: 'address',
    city: 'city',
    state: 'state',
    zip: '1234213',
    country: 'country',
    isProvider: true,
    services: [],
    certificates: [],
    picsOfWork: [],
    idPics: [],
    videoLinks: [],
    websiteLinks: [],
  }
  it('getInitialValue', () => {
    const result = getInitialValue(mockUser)

    const geolocation = mockUser.geolocation.split('/')

    expect(result).toEqual({
      avatar: mockUser.avatarURL,
      firstName: mockUser.given_name,
      lastName: mockUser.family_name,
      phoneNumber: mockUser.phone_number,
      emailVerified: mockUser.email_verified === 'true',
      phoneNumberVerified: mockUser.phone_number_verified === 'true',
      email: mockUser.email,
      isAgreedWithTerms: mockUser.isAgreedWithTerms,
      defaultRadius: mockUser.defaultRadius,
      isPro: mockUser.isPro,
      dateOfBirth: moment(mockUser.birthdate).valueOf(),
      about: mockUser.about,
      location: {
        address: mockUser.address,
        city: mockUser.city,
        state: mockUser.state,
        zipCode: mockUser.zip,
        country: mockUser.country,
        lat: geolocation[0],
        lon: geolocation[1],
      },
      isProvider: mockUser.isProvider,
      services: mockUser.services,
      certificates: getImages(mockUser.certificates),
      picsOfWork: getImages(mockUser.picsOfWork),
      idPics: getImages(mockUser.idPics),
      videoLinks: mockUser.videoLinks,
      websiteLinks: mockUser.websiteLinks,
    })
  })
  it('getResultObject', () => {
    const geolocation = mockUser.geolocation.split('/')

    const values = {
      firstName: 'firstName',
      lastName: 'lastName',
      dateOfBirth: 1570027491744,
      phoneNumber: '4213412554',
      email: mockUser.email,
      isPro: false,
      isProvider: true,
      about: 'dasd wdad wdas',
      defaultRadius: '321',
      location: {
        address: mockUser.address,
        city: mockUser.city,
        state: mockUser.state,
        zipCode: mockUser.zip,
        country: mockUser.country,
        lat: geolocation[0],
        lon: geolocation[1],
      },
      services: [],
      websiteLinks: [],
      videoLinks: [],
      certificates: [],
      picsOfWork: [],
      idPics: [],
    }

    const result = getResultObject(mockUser, values)

    expect(result).toEqual({
      firstName: values.firstName,
      lastName: values.lastName,
      birthdate: values.dateOfBirth,
      phoneNumber: values.phoneNumber,
      defaultRadius: Number(values.defaultRadius),
      aboutYourself: values.about,
    })
  })
})
