import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { MapWrapper } from 'Components/Blocks'
import { InputBlock, LocationAutocomplete } from 'Components/UI'

import {
  Container,
  Row,
  Block,
  BordererContainer,
  AddressContainer,
  MapWrapperContainer,
} from './style'

const Location = ({
  text,
  address,
  city,
  state,
  zipCode,
  country,
  lat,
  lon,
  onMapClick,
  onChangeCity,
  onChangeState,
  onChangeZipCode,
  onChangeCountry,
  onOpenLocationModal,
}) => (
  <Container>
    <BordererContainer>
      <AddressContainer>
        <TouchableOpacity onPress={onOpenLocationModal}>
          <LocationAutocomplete
            value={address}
            label={text.addressLabel}
            placeholder={text.addressPlaceholder}
            onClick={onOpenLocationModal}
          />
        </TouchableOpacity>
      </AddressContainer>
    </BordererContainer>
    <BordererContainer>
      <Row>
        <Block>
          <InputBlock
            value={city}
            onChange={onChangeCity}
            label={text.city}
            animatedLabel
            animatedLine
          />
        </Block>
        <Block>
          <InputBlock
            value={state}
            onChange={onChangeState}
            label={text.state}
            animatedLabel
            animatedLine
          />
        </Block>
      </Row>
      <Row>
        <Block>
          <InputBlock
            value={zipCode}
            onChange={onChangeZipCode}
            label={text.zipCode}
            animatedLabel
            animatedLine
          />
        </Block>
        <Block>
          <InputBlock
            value={country}
            onChange={onChangeCountry}
            label={text.country}
            animatedLabel
            animatedLine
          />
        </Block>
      </Row>

      <TouchableOpacity onPress={onMapClick}>
        <MapWrapperContainer>
          <MapWrapper lat={lat} lon={lon} />
        </MapWrapperContainer>
      </TouchableOpacity>
    </BordererContainer>
  </Container>
)

Location.propTypes = {
  text: PropTypes.object.isRequired,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  country: PropTypes.string,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeCity: PropTypes.func.isRequired, // from formik
  onChangeState: PropTypes.func.isRequired, // from formik
  onChangeZipCode: PropTypes.func.isRequired, // from formik
  onChangeCountry: PropTypes.func.isRequired, // from formik
  onOpenLocationModal: PropTypes.func.isRequired,
  onMapClick: PropTypes.func.isRequired,
}

export { Location }
