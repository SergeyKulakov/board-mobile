import { Dimensions } from 'react-native'
import metrics from 'Themes/Metrics'

export default {
  SnapCarousel: {
    getSliderWidth: () => Dimensions.get('window').width,
    getItemWidth: () => metrics.widthPercentageToDP(100),
  },
}
