import { Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

const widthPercentageToDP = widthPercent =>
  PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').width * widthPercent) / 100,
  )

const heightPercentageToDP = heightPercent =>
  PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').height * heightPercent) / 100,
  )

const fontPercantageToDP = fontSize =>
  PixelRatio.roundToNearestPixel(((width / 9) * 16 * fontSize) / 100)

const getWindowWidth = () => Dimensions.get('window').width
const getWindowHeight = () => Dimensions.get('window').height

export default {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  paddingSmall: 10,
  widthPercentageToDP,
  heightPercentageToDP,
  fontPercantageToDP,
  getWindowWidth,
  getWindowHeight,
}
