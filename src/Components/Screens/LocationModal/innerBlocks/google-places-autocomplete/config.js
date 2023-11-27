import Qs from 'qs'

const api = {
  places: 'https://maps.googleapis.com/maps/api/place/details/json?',
  geocodePlace: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  geocode: 'https://maps.googleapis.com/maps/api/geocode/json?',
  placesInput:
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=',
}

export const getPlacesRequstString = (query, placeId) => {
  const params = Qs.stringify({
    key: query.key,
    placeId,
    language: query.language,
  })

  return `${api.places}${params}`
}

export const getUrlReverseGeocoding = (
  lat,
  lon,
  key,
  GoogleReverseGeocodingQuery,
) => {
  const params = Qs.stringify({
    latlng: `${lat},${lon}`,
    key,
    ...GoogleReverseGeocodingQuery,
  })
  return `${api.geocode}${params}`
}

export const getUrlReversePlaces = (lat, lon, key, GooglePlacesSearchQuery) => {
  const params = Qs.stringify({
    location: `${lat},${lon}`,
    key,
    ...GooglePlacesSearchQuery,
  })

  return `${api.geocodePlace}${params}`
}

export const defaultProps = {
  placeholder: 'Search',
  placeholderTextColor: '#A8A8A8',
  isRowScrollable: true,
  underlineColorAndroid: 'transparent',
  returnKeyType: 'default',
  onPress: () => {},
  onNotFound: () => {},
  onFail: () => {},
  minLength: 0,
  fetchDetails: false,
  autoFocus: false,
  autoFillOnNotFound: false,
  keyboardShouldPersistTaps: 'always',
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('google places autocomplete: request timeout'),
  query: {
    key: 'missing api key',
    language: 'en',
    types: 'geocode',
  },
  GoogleReverseGeocodingQuery: {},
  GooglePlacesSearchQuery: {
    rankby: 'distance',
    types: 'food',
  },
  styles: {},
  textInputProps: {},
  enablePoweredByContainer: true,
  predefinedPlaces: [],
  currentLocation: false,
  currentLocationLabel: 'Current location',
  nearbyPlacesAPI: 'GooglePlacesSearch',
  enableHighAccuracyLocation: true,
  filterReverseGeocodingByTypes: [],
  predefinedPlacesAlwaysVisible: false,
  enableEmptySections: true,
  listViewDisplayed: 'auto',
  debounce: 0,
  textInputHide: false,
  suppressDefaultStyles: false,
  numberOfLines: 1,
  onSubmitEditing: () => {},
  editable: true,
}
