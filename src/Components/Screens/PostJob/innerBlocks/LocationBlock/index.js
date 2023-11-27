import React from 'react'
import PropTypes from 'prop-types'

import { InputBlock, LocationAutocomplete } from 'Components/UI'
import { MapWrapper } from 'Components/Blocks'
import { WrapperTitle } from '../WrapperTitle'

import {
  Container,
  RowBlock,
  RowItem,
  LocationImageContainer,
  Header,
  SubTitle,
} from './style'

const LocationBlock = ({
  values,
  text,
  geocode,
  isError,
  onChange,
  onBlur,
  onClickStreetAddress,
  onMapClick,
}) => (
  <Container>
    <Header>
      <WrapperTitle isError={isError}>{text.title}</WrapperTitle>
      <SubTitle>{text.subTitle}</SubTitle>
    </Header>
    <LocationAutocomplete
      label={text.street}
      onClick={onClickStreetAddress}
      value={values.address}
    />
    <RowBlock>
      <RowItem>
        <InputBlock
          animatedLabel
          animatedLine
          label={text.city}
          onChange={value => onChange('city', value)}
          value={values.city}
          onBlur={onBlur('city')}
        />
      </RowItem>
      <RowItem mr={0}>
        <InputBlock
          animatedLabel
          animatedLine
          label={text.state}
          onChange={value => onChange('state', value)}
          value={values.state}
          onBlur={onBlur('state')}
        />
      </RowItem>
    </RowBlock>
    <RowBlock>
      <RowItem>
        <InputBlock
          animatedLabel
          animatedLine
          label={text.zip}
          onChange={value => onChange('zipCode', value)}
          value={values.zipCode}
          onBlur={onBlur('zipCode')}
        />
      </RowItem>
      <RowItem mr={0}>
        <InputBlock
          animatedLabel
          animatedLine
          label={text.country}
          onChange={value => onChange('country', value)}
          value={values.country}
          onBlur={onBlur('country')}
        />
      </RowItem>
    </RowBlock>
    <RowItem width="100%" mr={0}>
      <LocationImageContainer>
        <MapWrapper
          lat={geocode.lat}
          lon={geocode.lon}
          onMapClick={onMapClick}
        />
      </LocationImageContainer>
    </RowItem>
  </Container>
)

LocationBlock.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }),
  values: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string,
  }),
  geocode: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onChange: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onClickStreetAddress: PropTypes.func.isRequired,
  onMapClick: PropTypes.func,
}

export { LocationBlock }
