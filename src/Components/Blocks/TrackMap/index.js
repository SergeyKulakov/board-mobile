import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import _ from 'lodash'
import { carLocation } from 'Assets/images/Icons'

import config from './config'
import { Map } from './style'

class TrackMap extends Component {
  map = React.createRef()

  componentDidUpdate(prevProps) {
    const { carMarker } = this.props

    if (!_.isEqual(carMarker, prevProps.carMarker) && !_.isEmpty(carMarker)) {
      const { lat, lng } = carMarker
      this.map.current.setCamera({
        center: {
          latitude: Number(lat),
          longitude: Number(lng),
        },
        zoom: 14,
      })
    }
  }

  render() {
    const { secondMarker, carMarker, initialRegion } = this.props

    if (_.isEmpty(initialRegion)) return null

    return (
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          latitude: Number(initialRegion.lat),
          longitude: Number(initialRegion.lng || initialRegion.lon),
        }}
        ref={this.map}
        {...config}
      >
        {_.isEmpty(secondMarker) ? null : (
          <Marker
            coordinate={{
              latitude: Number(secondMarker.lat),
              longitude: Number(secondMarker.lon),
            }}
          />
        )}
        {_.isEmpty(carMarker) ? null : (
          <Marker
            coordinate={{
              latitude: Number(carMarker.lat),
              longitude: Number(carMarker.lng),
            }}
            image={carLocation}
          />
        )}
      </Map>
    )
  }
}

TrackMap.propTypes = {
  initialRegion: PropTypes.object,
}

export default TrackMap
