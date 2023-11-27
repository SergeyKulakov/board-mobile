import { Platform } from 'react-native'

export default {
  swipeToOpenPercent: 70,
  rightOpenValue: -160,
  closeOnRowOpen: true,
  stopRightSwipe: -200,
  leftOpenValue: 150,
  stopLeftSwipe: 160,
  useFlatList: true,
  disableLeftSwipe: true,
  closeOnRowPress: true,
  recalculateHiddenLayout: true,
  onEndReachedThreshold: Platform.select({ ios: 0.4, android: 0.5 }),
  keyExtractor: item => item._id,
}
