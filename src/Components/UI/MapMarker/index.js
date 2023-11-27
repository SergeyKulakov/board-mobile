import React from 'react'
import PropTypes from 'prop-types'
import { getGeocodeObg } from 'Helpers/googleMaps'

import { Circle } from 'react-native-maps'
import { colors } from 'Themes'

const MapMarker = ({ center, isActive, ...props }) => {
  const { lat, lon } = getGeocodeObg(center)
  return (
    <Circle
      radius={300}
      strokeWidth={1}
      strokeColor={colors.red08}
      fillColor={isActive ? colors.jade04 : colors.red02}
      center={{
        latitude: Number(lat),
        longitude: Number(lon),
      }}
      {...props}
    />
  )
}

MapMarker.propTypes = {
  center: PropTypes.string,
  isActive: PropTypes.bool,
}

export { MapMarker }
