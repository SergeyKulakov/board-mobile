import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getLocatinByGeocoding } from 'Helpers/googleMaps'
import parseGoogleAddress from 'Helpers/parse-google-places'
import axios from 'axios'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { ScreenHeader, Button, BackIcon, ScreenTitle } from 'Components/UI'
import { colors } from 'Themes'
import config, { getText } from './config'
import { Container, HeaderBlock, Content, styles } from './style'

class GoogleMapModal extends PureComponent {
  constructor(props) {
    super(props)

    const { lat, lon } = props

    const state = {
      data: null,
      loading: false,
      latitudeDelta: lat && lon ? 0.0922 : 50,
      longitudeDelta: lat && lon ? 0.0421 : 50,
      lat: Number(lat),
      lon: Number(lon),
    }

    if (lat && lon) {
      state.data = {
        latitude: Number(lat),
        longitude: Number(lon),
      }
    }

    this.state = state

    this.text = getText()
  }

  handleMapClick = ({ nativeEvent: { coordinate } }) =>
    this.setState({ data: coordinate })

  handleSubmit = async () => {
    const { onSubmit, navigate } = this.props
    const { data } = this.state

    try {
      const location = await axios.get(
        getLocatinByGeocoding(data.latitude, data.longitude),
      )

      if (location.data.results.length) {
        onSubmit(parseGoogleAddress(location.data.results[0]))
      } else {
        onSubmit({ lat: data.latitude, lon: data.longitude })
      }

      navigate.hideModal()
    } catch (err) {
      if (__DEV__) console.log('GoogleMapModal.43 error: ', err)
    }
  }

  render() {
    const { navigate } = this.props
    const {
      data,
      loading,
      latitudeDelta,
      longitudeDelta,
      lat,
      lon,
    } = this.state
    const { text } = this

    return (
      <Container>
        <ScreenHeader>
          <HeaderBlock>
            <BackIcon onClick={navigate.hideModal} />
          </HeaderBlock>
          <HeaderBlock flex={5}>
            <ScreenTitle style={styles.ScreenTitle}>Pick Place</ScreenTitle>
          </HeaderBlock>
          <HeaderBlock />
        </ScreenHeader>
        <Content>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.MapView}
            initialRegion={{
              latitude: lat || 0,
              longitude: lon || 0,
              latitudeDelta,
              longitudeDelta,
            }}
            {...config.MapView}
            onPress={this.handleMapClick}
          >
            {data && (
              <Marker
                draggable
                coordinate={data}
                key={1}
                color={colors.red}
                onDragEnd={this.handleMapClick}
              />
            )}
          </MapView>
        </Content>
        <Button
          text={text.saveButton}
          visible={Boolean(data)}
          linear
          loading={loading}
          onClick={this.handleSubmit}
        />
      </Container>
    )
  }
}

GoogleMapModal.propTypes = {
  navigate: PropTypes.object.isRequired, // from withNavigate hoc
  onSubmit: PropTypes.func.isRequired, // from passProps
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default GoogleMapModal
