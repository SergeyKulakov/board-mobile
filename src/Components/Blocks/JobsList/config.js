import { Platform } from 'react-native'

export default {
  SwipeListView: {
    leftOpenValue: 150,
    swipeToOpenPercent: 70,
    rightOpenValue: -160,
    closeOnRowOpen: true,
    stopLeftSwipe: 160,
    stopRightSwipe: -170,
    useFlatList: true,
    closeOnRowPress: true,
    // FlatList props
    recalculateHiddenLayout: true,
    onEndReachedThreshold: Platform.select({ ios: 0.4, android: 0.5 }),
    keyExtractor: item => item._id,
  },
}
