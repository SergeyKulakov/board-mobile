import { Dimensions, Platform } from 'react-native'

export function isIphoneX() {
  const dm = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dm.height === 812 ||
      dm.width === 812 ||
      dm.width === 896 ||
      dm.height === 896)
  )
}

export const isIos = () => Platform.OS === 'ios'

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}
