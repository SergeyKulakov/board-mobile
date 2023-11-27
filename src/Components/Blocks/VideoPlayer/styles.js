import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 48,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  mainButton: {
    marginRight: 15,
  },
  duration: {
    color: '#FFF',
    marginLeft: 15,
  },
  videoErrorCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255, .9)',
  },
  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  iconPlay: {
    marginRight: 15,
  },
})

export default styles
