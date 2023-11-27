import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { GeneralInfo as Component } from '../index'

describe('Profile.GeneralInfo', () => {
  const defaultProps = {
    avatar: 'avatar',
    setFieldValue: () => null,
    values: {
      location: {
        address: 'address',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
        country: 'country',
      },
      firstName: 'first name',
      lastName: 'last name',
      dateOfBirth: '12-10-2000',
      isAgreedWithTerms: true,
    },
    errors: {},
    touched: {},
    text: {
      streetAddress: '',
      errorAddressLocated: 'errorAddressLocated',
    },
    handleChange: () => null,
    handleBlur: () => null,
    setValues: () => null,
    onVerify: () => null,
    userPhone: '+31241312314',
    userEmail: 'user@email.com',
    userId: 'userId',
    onOpenAddressModal: () => null,
    onOpenGoogleMap: () => null,
    isRequestVerifyEmail: false,
    isRequestVerifyPhone: false,
    toast: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('set fields', () => {
    it('should not set any field by default', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.setFieldValue).not.toHaveBeenCalled()
    })

    it('dateOfBirth', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const newDate = Date.now().valueOf()

      wrapper
        .find(getTestID('DatePicker'))
        .props()
        .onSelect(newDate)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('dateOfBirth', newDate)
    })

    it('phone number', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = '+385743251273'

      wrapper
        .find(getTestID('PhoneNumber'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('phoneNumber', args)
    })

    it('email', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'dfaksdvf'

      wrapper
        .find(getTestID('Email'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('email', args)
    })

    it('last name', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'last name'

      wrapper
        .find(getTestID('LastName'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('lastName', args)
    })

    it('first name', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'first name'

      wrapper
        .find(getTestID('FirstName'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('firstName', args)
    })

    it('avatar', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = '12318340198rei0f1hrfh10ruhf019-'

      wrapper
        .find(getTestID('UploadAvatar'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith(
        'avatar',
        `data:image/png;base64,${args}`,
      )
    })
  })

  it('open addresses modal', () => {
    const props = {
      ...defaultProps,
      onOpenAddressModal: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onOpenAddressModal).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('LocationAutocomplete'))
      .props()
      .onClick()

    expect(props.onOpenAddressModal).toHaveBeenCalledTimes(1)
  })

  describe('open map modal', () => {
    it('should not opened by default', () => {
      const props = {
        ...defaultProps,
        onOpenGoogleMap: jest.fn(),
        toast: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.onOpenGoogleMap).not.toHaveBeenCalled()

      // wrapper.find(getTestID('openMapButton')).props().onPress()
    })

    it('successful add address', done => {
      const args = {
        address: 'address',
        city: 'city',
        stateLong: 'stateLong',
        zipCode: 'zipCode',
        countryLong: 'countryLong',
        lat: 'lat',
        lon: 'lon',
      }
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        toast: jest.fn(),
        onOpenGoogleMap: jest.fn(({ onSubmit }) => {
          setTimeout(() => {
            onSubmit(args)
          }, 1000)
        }),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find(getTestID('openMapButton'))
        .props()
        .onPress()

      setTimeout(() => {
        expect(props.toast).not.toHaveBeenCalled()
        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledWith('location', {
          address: 'address',
          city: 'city',
          state: 'stateLong',
          zipCode: 'zipCode',
          country: 'countryLong',
          lat: 'lat',
          lon: 'lon',
        })
        done()
      }, 1100)
    })

    it('failure add address', done => {
      const args = 'value'
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        toast: jest.fn(),
        onOpenGoogleMap: jest.fn(({ onSubmit }) => {
          setTimeout(() => {
            onSubmit(args)
          }, 1000)
        }),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find(getTestID('openMapButton'))
        .props()
        .onPress()

      setTimeout(() => {
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(props.text.errorAddressLocated)
        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledWith('location', {
          address: args,
          city: '',
          state: '',
          zipCode: '',
          country: '',
          lat: null,
          lon: null,
        })
        done()
      }, 1100)
    })
  })

  describe('set isAgreedWithTerms', () => {
    it('set true', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          ...defaultProps.values,
          isAgreedWithTerms: false,
        },
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find(getTestID('LicenseAgreement'))
        .props()
        .onSuccess()

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith(
        'isAgreedWithTerms',
        true,
      )
    })

    it('change current value', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          ...defaultProps.values,
          isAgreedWithTerms: false,
        },
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find(getTestID('LicenseAgreement'))
        .props()
        .onChange()

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith(
        'isAgreedWithTerms',
        true,
      )

      wrapper.setProps({
        values: {
          ...props.values,
          isAgreedWithTerms: true,
        },
      })

      wrapper
        .find(getTestID('LicenseAgreement'))
        .props()
        .onChange()

      expect(props.setFieldValue).toHaveBeenCalledTimes(2)
      expect(props.setFieldValue).toHaveBeenCalledWith(
        'isAgreedWithTerms',
        false,
      )
    })
  })

  describe('set custom address', () => {
    it('with deprecated geolocation', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          ...defaultProps.values,
          location: {
            ...defaultProps.values.location,
            lat: 51.23124,
            lon: 51.23124,
          },
        },
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'new city'

      wrapper
        .find(getTestID('city'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('location', {
        ...props.values.location,
        city: args,
        lat: '',
        lon: '',
      })
    })

    it('city', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'new city'

      wrapper
        .find(getTestID('city'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('location.city', args)
    })

    it('state', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'new state'

      wrapper
        .find(getTestID('state'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('location.state', args)
    })

    it('zipCode', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'new zipCode'

      wrapper
        .find(getTestID('zipCode'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('location.zipCode', args)
    })

    it('country', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 'new country'

      wrapper
        .find(getTestID('country'))
        .props()
        .onChange(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('location.country', args)
    })
  })
})
