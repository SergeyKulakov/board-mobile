import memoize from 'memoize-one'
import { getGeocodeObg } from 'Helpers/googleMaps'

export const getInitialRegion = memoize(job => {
  const { lat, lon } = getGeocodeObg(job.geolocation)

  return {
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    latitude: Number(lat),
    longitude: Number(lon),
  }
})
