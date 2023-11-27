import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getGeocodeObg } from 'Helpers/googleMaps'
import _ from 'lodash'
import Permissions from 'react-native-permissions'
import { isResolveTracking } from 'Helpers/tracking'

import { SliderAdvertising, TrackMap } from 'Components/Blocks'

import { Header } from './innerBlocks'

import {
  Container,
  Content,
  LoadingWrapper,
  Loader,
  PermissionErrorText,
} from './style'

class TrackJobMap extends PureComponent {
  state = {
    isLoad: true,
    location: {},
    permissionRequest: true,
    permissionError: false,
  }

  watchId = null

  map = React.createRef()

  componentDidMount() {
    this.checkPermissions()

    this.handleUpdateTrackedJob()
  }

  componentWillUnmount() {
    const { onUnsubscribeTracking, doerId, user } = this.props

    global.navigator.geolocation.clearWatch(this.watchId)

    if (user.username !== doerId) onUnsubscribeTracking(doerId)
  }

  checkPermissions = () => {
    const { job, user } = this.props
    Permissions.check('location')
      .then(response => {
        if (response === 'authorized') {
          this.setState({ permissionRequest: false })
          this.setWatchLocation()
          if (isResolveTracking(job, user)) {
            this.setSubscribe()
          }
        } else {
          this.handleRequestLocationPermission()
        }
      })
      .catch(console.warn)
  }

  handleRequestLocationPermission = () => {
    Permissions.request('location')
      .then(response => {
        if (response === 'authorized') this.setWatchLocation()
        this.setState({
          permissionRequest: false,
          permissionError: response !== 'authorized',
        })
      })
      .catch(console.warn)
  }

  setSubscribe = () => {
    const { doerId, user, onStartTracking, onShowPuck, t } = this.props

    if (user.username !== doerId) onStartTracking(doerId)

    setTimeout(() => {
      const { geolocation } = this.props

      if (geolocation === null) {
        onShowPuck({
          type: 'warning',
          message: t('LeftoverOnes.TrackingNotShowingWhenAvailable'),
        })
      }
    }, 1000)
  }

  sendLocation = location => {
    const { doerId, user, onUpdateTrack } = this.props

    if (doerId === user.username) onUpdateTrack(location)
  }

  errorHandler = error => {
    if (error.PERMISSION_DENIED === 1) {
      this.setState({ isLoad: false, permissionError: true })
    }
  }

  setWatchLocation = () => {
    global.navigator.geolocation.getCurrentPosition(({ coords }) => {
      const location = {
        lat: Number(coords.latitude),
        lng: Number(coords.longitude),
      }
      this.sendLocation(location)

      this.setState({
        location,
        isLoad: false,
      })
    }, this.errorHandler)

    this.watchId = global.navigator.geolocation.watchPosition(({ coords }) => {
      const location = {
        lat: Number(coords.latitude),
        lng: Number(coords.longitude),
      }
      this.sendLocation(location)

      this.setState({ location })
    }, this.errorHandler)
  }

  handleUpdateTrackedJob = () => {
    const { onLoadJob, jobId, getError, onShowPuck } = this.props

    onLoadJob(jobId, ({ error }) => {
      if (error) {
        onShowPuck({
          type: 'error',
          message: getError(error),
        })
      }
    })
  }

  renderMap = () => {
    const { geolocation, user, doerId, job, t } = this.props
    const { location, isLoad, permissionRequest, permissionError } = this.state

    if (isLoad || permissionRequest) {
      return (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      )
    }

    if (permissionError) {
      return (
        <LoadingWrapper>
          <PermissionErrorText>
            {t('jobTrack.locationPermissionRejected')}
          </PermissionErrorText>
        </LoadingWrapper>
      )
    }

    const jobGeolocation = getGeocodeObg(_.get(job, 'geolocation'))

    return (
      <TrackMap
        initialRegion={geolocation || location}
        secondMarker={jobGeolocation}
        carMarker={user.username !== doerId && geolocation}
        onCreateRef={this.map}
      />
    )
  }

  render() {
    const { navigate, onShowAd, isAdsLoading } = this.props

    return (
      <Container>
        <Header onBackClick={navigate.pop} />
        <Content>
          <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
          {this.renderMap()}
        </Content>
      </Container>
    )
  }
}

TrackJobMap.propTypes = {
  navigate: PropTypes.object,
  geolocation: PropTypes.object,
  onUpdateTrack: PropTypes.func,
  user: PropTypes.object,
  doerId: PropTypes.string,
  job: PropTypes.object,
  onUnsubscribeTracking: PropTypes.func,
  onStartTracking: PropTypes.func,
  onLoadJob: PropTypes.func,
  jobId: PropTypes.string,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
  t: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default TrackJobMap
