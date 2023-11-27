import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import { getGeocodeObg } from 'Helpers/googleMaps'

import { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { Header } from './innerBlocks'
import { getInitialRegion } from './memoize'
import { Container, Content, Map } from './style'

const MapModal = ({ navigate, job }) => {
  const initialRegion = getInitialRegion(job)

  const getCoords = memoize(geolocation => getGeocodeObg(geolocation))
  const { lat, lon } = getCoords(job.geolocation)

  return (
    <Container>
      <Header title={job.title} onBackClick={navigate.hideModal} />
      <Content>
        <Map
          provider={PROVIDER_GOOGLE}
          mapType="standard"
          showsUserLocation
          zoomEnabled
          initialRegion={initialRegion}
        >
          <Marker
            coordinate={{
              latitude: Number(lat),
              longitude: Number(lon),
            }}
          />
        </Map>
      </Content>
    </Container>
  )
}

MapModal.propTypes = {
  job: PropTypes.object.isRequired,
  navigate: PropTypes.object,
}

export default MapModal
