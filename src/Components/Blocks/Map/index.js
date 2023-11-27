import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import GoogleMap, { PROVIDER_GOOGLE } from 'react-native-maps'
import { getGeocodeObg } from 'Helpers/googleMaps'

import { MapMarker } from 'Components/UI'
import { ScreenLoader } from '../ScreenLoader'
import { MapSlider } from '../MapSlider'

import config from './config'
import { Container, MapSliderBlock, SliderItemWrapper, style } from './style'

class Map extends PureComponent {
  constructor(props) {
    super(props)

    const state = {
      activeIndex: 0,
      region: {
        lat: 0,
        lon: 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      isShowCards: true,
      isSearchUserLocation: true,
    }

    if (!_.isEmpty(props.data)) {
      const { lat, lon } = getGeocodeObg(props.data[0].geolocation)
      state.region.lat = Number(lat)
      state.region.lon = Number(lon)
    }

    const geocode = getGeocodeObg(_.get(props, 'user.geolocation'))
    state.region.lat = Number(geocode.lat) || 13.71393
    state.region.lon = Number(geocode.lon) || -96.824

    this.state = state
    this.isMapClick = false
    this.isLoadingMap = false
    this.region = {}
  }

  componentDidMount() {
    const { onErrorLoadUserLocation } = this.props
    global.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState(prevState => ({
          region: {
            ...prevState.region,
            lat: coords.latitude,
            lon: coords.longitude,
          },
          isSearchUserLocation: false,
        }))
      },
      () => {
        this.setState({ isSearchUserLocation: false }, onErrorLoadUserLocation)
      },
    )
  }

  hideSlider = () => this.setState({ isShowCards: false })

  handleChangeActiveIndex = index => {
    const { data } = this.props
    this.region = {}

    if (this.isMapClick) {
      this.isMapClick = false
    }

    const card = data[index]

    const { lat, lon } = getGeocodeObg(card.geolocation)

    this.setState({
      activeIndex: index,
      region: {
        lat: Number(lat),
        lon: Number(lon),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    })

    this._loadMore(index)
  }

  handleCheckClick = ({ nativeEvent: { coordinate } }) => {
    const { data } = this.props
    const fixed = 2

    if (this.isLoadingMap) return

    this.isLoadingMap = true

    const lat = coordinate.latitude.toFixed(fixed)
    const lon = coordinate.longitude.toFixed(fixed)

    const chooseItem = data.find(el => {
      const { lat: elLat, lon: elLon } = getGeocodeObg(el.geolocation)
      return elLat.toFixed(fixed) === lat && elLon.toFixed(fixed) === lon
    })

    if (chooseItem) {
      const index = data.indexOf(chooseItem)

      if (index === -1) return

      this.isMapClick = true
      this.setState(
        {
          region: {
            lat: this.region.lat,
            lon: this.region.lon,
            latitudeDelta: this.region.latitudeDelta,
            longitudeDelta: this.region.longitudeDelta,
          },
          isShowCards: true,
          activeIndex: index,
        },
        () => {
          this.slider.snapToItem(index)
          this.isLoadingMap = false
        },
      )
      this._loadMore(index)
    } else
      this.setState({ isShowCards: false }, () => {
        this.isLoadingMap = false
      })
  }

  handleRegionChange = ({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }) => {
    this.region = {
      lat: latitude,
      lon: longitude,
      latitudeDelta,
      longitudeDelta,
    }
  }

  _loadMore = index => {
    const { data, onLoadMore } = this.props

    if (_.isFunction(onLoadMore) && data.length - 1 >= index + 1) onLoadMore()
  }

  renderMapCard = props => {
    const { renderMapCard } = this.props

    return <SliderItemWrapper>{renderMapCard(props)}</SliderItemWrapper>
  }

  renderSlider = () => {
    const { data, isHelpCard } = this.props
    const { activeIndex } = this.state

    return (
      <MapSliderBlock isHelpCard={isHelpCard}>
        <MapSlider
          renderItem={this.renderMapCard}
          onChangeIndex={this.handleChangeActiveIndex}
          data={data}
          extraData={[activeIndex]}
          onCreateRef={ref => (this.slider = ref)}
        />
      </MapSliderBlock>
    )
  }

  render() {
    const { data } = this.props
    const {
      region,
      activeIndex,
      isSearchUserLocation,
      isShowCards,
    } = this.state

    return (
      <Container>
        <GoogleMap
          ref={ref => (this.map = ref)}
          provider={PROVIDER_GOOGLE}
          style={style}
          onPress={this.handleCheckClick}
          onRegionChangeComplete={this.handleRegionChange}
          region={{
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
            latitude: region.lat,
            longitude: region.lon,
          }}
          {...config}
        >
          {_.isEmpty(data)
            ? null
            : data.map((el, index) => (
                <MapMarker
                  center={el.geolocation}
                  key={el._id}
                  isActive={index === activeIndex}
                />
              ))}
        </GoogleMap>
        {_.isEmpty(data) || !isShowCards ? null : this.renderSlider()}
        <ScreenLoader visible={isSearchUserLocation} />
      </Container>
    )
  }
}

Map.propTypes = {
  data: PropTypes.array,
  extraData: PropTypes.array,
  onLoadMore: PropTypes.func,
  renderMapCard: PropTypes.func,
  user: PropTypes.object,
  onErrorLoadUserLocation: PropTypes.func,
}

export { Map }
