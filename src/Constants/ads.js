import { Platform } from 'react-native'
import {
  FB_ADS_PLACEMENT_ID_IOS,
  FB_ADS_PLACEMENT_ID_ANDROID,
  ADMOB_UNIT_ID_IOS,
  ADMOB_UNIT_ID_ANDROID,
} from 'react-native-dotenv'

export const admobUnitId = Platform.select({
  // ios: 'ca-app-pub-3940256099942544/1033173712', // test unit id
  ios: ADMOB_UNIT_ID_IOS,
  android: ADMOB_UNIT_ID_ANDROID,
})

export const fbAdsPlacementId = Platform.select({
  ios: FB_ADS_PLACEMENT_ID_IOS,
  android: FB_ADS_PLACEMENT_ID_ANDROID,
})
