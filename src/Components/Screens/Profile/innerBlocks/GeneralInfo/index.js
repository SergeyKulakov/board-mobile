import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'

import { getProfileImage } from 'Helpers/getImageUri'

import { TouchableOpacity } from 'react-native'
import { MapWrapper, LicenseAgreement } from 'Components/Blocks'
import { UploadImage, InputBlock, LocationAutocomplete } from 'Components/UI'

import { defaultAvatar } from 'Assets/images/Profile'

import { DatePicker, VerifyError } from '../blocks'

import {
  Container,
  RowBlock,
  RowItem,
  GeolocationInfoBlock,
  LocationImageContainer,
} from './style'

const GeneralInfo = ({
  values,
  setFieldValue,
  handleBlur,
  onOpenAddressModal,
  onOpenGoogleMap,
  userId,
  touched,
  errors,
  text,
  onVerify,
  toast,
  isRequestVerifyEmail,
  isRequestVerifyPhone,
  userEmail,
  userPhone,
  onOpenPhoneModal,
}) => {
  const handleSaveLocation = value => {
    if (_.isObject(value)) {
      setFieldValue('location', {
        address: value.address,
        city: value.city,
        state: value.stateLong,
        zipCode: value.zipCode,
        country: value.countryLong,
        lat: value.lat,
        lon: value.lon,
      })
    } else {
      toast(text.errorAddressLocated)
      setFieldValue('location', {
        address: value,
        city: '',
        state: '',
        zipCode: '',
        country: '',
        lat: null,
        lon: null,
      })
    }
  }

  const revokeGeolocationData = (type, value) => {
    if (values.location.lat || values.location.lon) {
      setFieldValue('location', {
        ...values.location,
        [type]: value,
        lat: '',
        lon: '',
      })
    } else setFieldValue(`location.${type}`, value)
  }

  const handleOpenMapPicker = () => {
    onOpenGoogleMap({
      lat: values.location.lat,
      lon: values.location.lon,
      onSubmit: handleSaveLocation,
    })
  }

  const avatar = values.avatar
    ? getProfileImage({
        type: profileImageTypes.avatar,
        src: values.avatar,
        userId,
      })
    : defaultAvatar

  return (
    <Container>
      <UploadImage
        testID="UploadAvatar"
        icon
        image={avatar}
        onChange={base64 =>
          setFieldValue('avatar', `data:image/png;base64,${base64}`)
        }
      />
      <RowBlock>
        <RowItem>
          <InputBlock
            testID="FirstName"
            animatedLabel
            animatedLine
            value={values.firstName}
            label={text.firstName}
            maxLength={15}
            onChange={value => setFieldValue('firstName', value)}
            onBlur={handleBlur('firstName')}
          />
        </RowItem>
        <RowItem mr={0}>
          <InputBlock
            testID="LastName"
            animatedLabel
            animatedLine
            maxLength={15}
            value={values.lastName}
            label={text.lastName}
            onChange={value => setFieldValue('lastName', value)}
            onBlur={handleBlur('lastName')}
          />
        </RowItem>
      </RowBlock>
      <RowBlock>
        <RowItem flex={1} mr={0}>
          <InputBlock
            testID="Email"
            animatedLabel
            animatedLine
            value={values.email}
            label={text.email}
            onChange={value => setFieldValue('email', value)}
            onBlur={handleBlur('email')}
          />
          {userEmail && values.email === userEmail && !values.emailVerified ? (
            <VerifyError
              testID="verifyErrorButton"
              loading={isRequestVerifyEmail}
              text={{ link: text.verify, info: text.emailVerify }}
              onClick={() => onVerify('email', values.email)}
            />
          ) : null}
        </RowItem>
      </RowBlock>
      <RowBlock>
        <RowItem flex={1} mr={0}>
          <InputBlock
            testID="PhoneNumber"
            animatedLine
            onOpenPhoneModal={onOpenPhoneModal}
            errorMessage={touched.phoneNumber && errors.phoneNumber}
            label={text.phoneNumber}
            value={values.phoneNumber}
            onChange={value => setFieldValue('phoneNumber', value)}
            onBlur={handleBlur('phoneNumber')}
          />
          {userPhone &&
          values.phoneNumber === userPhone &&
          !values.phoneNumberVerified ? (
            <VerifyError
              testID="verifyErrorButton"
              loading={isRequestVerifyPhone}
              text={{
                link: text.verify,
                info: text.phoneVerify,
              }}
              onClick={() => onVerify('phone_number', values.phoneNumber)}
            />
          ) : null}
        </RowItem>
      </RowBlock>
      <RowBlock>
        <RowItem mr={0} flex={1}>
          <DatePicker
            text={text.DatePicker}
            testID="DatePicker"
            value={values.dateOfBirth}
            onSelect={date => setFieldValue('dateOfBirth', date)}
          />
        </RowItem>
      </RowBlock>
      <GeolocationInfoBlock>
        <LocationAutocomplete
          testID="LocationAutocomplete"
          label={text.streetAddress}
          onClick={() => onOpenAddressModal({ onSave: handleSaveLocation })}
          value={values.location.address}
        />
        <RowBlock>
          <RowItem flex={1} mr={0}>
            <InputBlock
              testID="defaultRadius"
              numberMode
              animatedLabel
              animatedLine
              maxLength={10}
              value={values.defaultRadius}
              label={text.defaultRadius}
              onChange={value => setFieldValue('defaultRadius', value)}
              onBlur={handleBlur('defaultRadius')}
            />
          </RowItem>
        </RowBlock>
        <RowBlock>
          <RowItem>
            <InputBlock
              testID="city"
              animatedLabel
              animatedLine
              label={text.cityLabel}
              onChange={value => revokeGeolocationData('city', value)}
              value={values.location.city}
              onBlur={handleBlur('location.city')}
            />
          </RowItem>
          <RowItem mr={0}>
            <InputBlock
              testID="state"
              animatedLabel
              animatedLine
              label={text.stateLabel}
              onChange={value => revokeGeolocationData('state', value)}
              value={values.location.state}
              onBlur={handleBlur('location.state')}
            />
          </RowItem>
        </RowBlock>
        <RowBlock>
          <RowItem>
            <InputBlock
              testID="zipCode"
              animatedLabel
              animatedLine
              label={text.zipCodeLabel}
              onChange={value => setFieldValue('location.zipCode', value)}
              value={values.location.zipCode}
              onBlur={handleBlur('location.zipCode')}
            />
          </RowItem>
          <RowItem mr={0}>
            <InputBlock
              testID="country"
              animatedLabel
              animatedLine
              label={text.countryLabel}
              onChange={value => revokeGeolocationData('country', value)}
              value={values.location.country}
              onBlur={handleBlur('location.country')}
            />
          </RowItem>
        </RowBlock>
        <RowItem width="100%" mr={0}>
          <TouchableOpacity
            testID="openMapButton"
            onPress={handleOpenMapPicker}
          >
            <LocationImageContainer>
              <MapWrapper lat={values.location.lat} lon={values.location.lon} />
            </LocationImageContainer>
          </TouchableOpacity>
        </RowItem>
      </GeolocationInfoBlock>
      <RowBlock>
        <LicenseAgreement
          testID="LicenseAgreement"
          onSuccess={() => setFieldValue('isAgreedWithTerms', true)}
          onChange={() =>
            setFieldValue('isAgreedWithTerms', !values.isAgreedWithTerms)
          }
          value={values.isAgreedWithTerms}
        />
      </RowBlock>
    </Container>
  )
}

GeneralInfo.propTypes = {
  userId: PropTypes.string,
  text: PropTypes.object,
  userEmail: PropTypes.string,
  userPhone: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  values: PropTypes.object,
  handleBlur: PropTypes.func,
  onVerify: PropTypes.func,
  setFieldValue: PropTypes.func,
  onOpenAddressModal: PropTypes.func,
  onOpenGoogleMap: PropTypes.func,
  toast: PropTypes.func,
  isRequestVerifyEmail: PropTypes.bool,
  isRequestVerifyPhone: PropTypes.bool,
  onOpenPhoneModal: PropTypes.func,
}

export { GeneralInfo }
