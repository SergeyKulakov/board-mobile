import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getMapImage } from 'Helpers/googleMaps'

import { Image } from 'Components/UI'

import { Title, Container, ImageWrapper } from './style'

const MapWrapper = ({
  title,
  imageProps,
  titleStyle,
  lat,
  lon,
  onMapClick,
  t,
}) => (
  <Container>
    <Title style={titleStyle}>{title || t('landingPage.map')}</Title>

    <ImageWrapper onPress={onMapClick} disabled={!_.isFunction(onMapClick)}>
      <Image
        withLoading
        resizeMode="cover"
        data={getMapImage({ lat, lon })}
        {...imageProps}
      />
    </ImageWrapper>
  </Container>
)

MapWrapper.propTypes = {
  title: PropTypes.string,
  imageProps: PropTypes.object,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleStyle: PropTypes.object,
  onMapClick: PropTypes.func,
  t: PropTypes.func,
}

export default MapWrapper
