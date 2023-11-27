import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  NetInfo,
  ActivityIndicator,
} from 'react-native'

import Video from 'react-native-video'
import ProgressBar from 'react-native-progress/Bar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from 'Themes'

import { secondsToTime } from 'Helpers/time'

import styles from './styles'

const { width } = Dimensions.get('window')
const height = width * 0.5625

class VideoPlayer extends PureComponent {
  state = {
    paused: true,
    progress: 0,
    duration: 0,
    error: null,
    showThumbnail: true,
    loading: false,
    trackLoading: false,
  }

  animated = new Animated.Value(0)

  player = {}

  track = {}

  componentDidMount() {
    const { navigation, isMobileDataForVideo } = this.props

    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (!isMobileDataForVideo && connectionInfo.type !== 'wifi') {
        this.setState({
          error: 'Video available only via wifi connection',
        })
      }
    })

    if (navigation) {
      this.sub1 = navigation.addListener('willBlur', this.handleFocusBlured)
    }
  }

  componentWillUnmount() {
    const { navigation } = this.props
    if (navigation) {
      this.sub1.remove()
    }
  }

  handleFocusBlured = () => this.setState({ paused: true })

  handleMainButtonTouch = () => {
    const { progress } = this.state
    this.triggerShowHide()
    if (progress >= 1) {
      this.player.seek(0)
      this.track.seek(0)
    }

    this.setState(state => ({ paused: !state.paused }))
  }

  handleProgressPress = e => {
    const { duration } = this.state
    this.triggerShowHide()

    const position = e.nativeEvent.locationX
    const progress = (position / 250) * duration

    this.player.seek(progress)
    this.track.seek(progress)
  }

  handleProgress = progress => {
    const { duration } = this.state

    this.setState({ progress: progress.currentTime / duration })
  }

  handleEnd = () => this.setState({ paused: true })

  handleVideoLoad = meta => {
    this.setState({
      duration: meta.duration,
      showThumbnail: false,
      loading: false,
    })
  }

  handleTrackLoad = () => this.setState({ trackLoading: false })

  handleLoadStart = () => this.setState({ loading: true, trackLoading: true })

  handleVideoPress = () => this.triggerShowHide()

  triggerShowHide = () => {
    clearTimeout(this.hideTimeout)

    Animated.timing(this.animated, {
      toValue: 1,
      duration: 100,
    }).start()
    this.hideTimeout = setTimeout(() => {
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 300,
      }).start()
    }, 1500)
  }

  handleError = meta => {
    const {
      error: { code },
    } = meta

    let error = 'An error has occurred playing this video'
    switch (code) {
      case -11800:
        error = 'Could not load video from URL'
        break
      default:
        break
    }

    this.setState({
      error,
      loading: false,
    })
  }

  render() {
    const interpolatedControls = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [48, 0],
    })

    const controlHideStyle = {
      transform: [
        {
          translateY: interpolatedControls,
        },
      ],
    }

    const { videoURL, previewURL, audioUrl } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <TouchableWithoutFeedback onPress={this.handleVideoPress}>
            <Video
              testID="VideoPlayer"
              paused={this.state.paused}
              resizeMode="cover"
              poster={this.state.showThumbnail ? previewURL : undefined}
              source={{ uri: videoURL }}
              style={{ width: '100%', height }}
              onLoadStart={this.handleLoadStart}
              onLoad={this.handleVideoLoad}
              onProgress={this.handleProgress}
              onEnd={this.handleEnd}
              onError={this.handleError}
              ref={ref => (this.player = ref)}
            />
          </TouchableWithoutFeedback>
          <Video
            audioOnly
            source={{ uri: audioUrl }}
            paused={this.state.paused}
            style={{ width: 0, height: 0 }}
            ref={ref => (this.track = ref)}
            onLoad={this.handleTrackLoad}
          />

          {this.state.paused && !this.state.loading && (
            <View style={styles.videoCover}>
              <TouchableWithoutFeedback
                testID="pausedButton"
                onPress={this.handleMainButtonTouch}
              >
                <Icon
                  type="FontAwesome"
                  name="play-circle"
                  size={85}
                  color="#fff"
                />
              </TouchableWithoutFeedback>
            </View>
          )}

          {(this.state.loading || this.state.trackLoading) && (
            <View style={styles.videoErrorCover}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          )}

          {this.state.error && (
            <View style={styles.videoErrorCover}>
              <Icon name="exclamation-triangle" size={30} color="red" />
              <Text>{this.state.error}</Text>
            </View>
          )}

          {!this.state.error && !this.state.loading && (
            <Animated.View style={[styles.controls, controlHideStyle]}>
              <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
                <Icon
                  name={!this.state.paused ? 'pause' : 'play'}
                  size={30}
                  color="#FFF"
                  style={styles.iconPlay}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                testID="progressButton"
                onPress={this.handleProgressPress}
              >
                <View>
                  <ProgressBar
                    progress={this.state.progress}
                    color="#FFF"
                    unfilledColor="rgba(255,255,255,.5)"
                    borderColor="#FFF"
                    width={250}
                    height={20}
                  />
                </View>
              </TouchableWithoutFeedback>

              <Text style={styles.duration}>
                {secondsToTime(
                  Math.floor(this.state.progress * this.state.duration),
                )}
              </Text>
            </Animated.View>
          )}
        </View>
      </View>
    )
  }
}

VideoPlayer.propTypes = {
  previewURL: PropTypes.string,
  videoURL: PropTypes.string,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }),
  isMobileDataForVideo: PropTypes.bool,
  audioUrl: PropTypes.string,
}

export { VideoPlayer }
