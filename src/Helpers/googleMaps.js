import _ from 'lodash'
import memoize from 'memoize-one'

const googleMaps = 'https://maps.googleapis.com/maps/api/staticmap'
const googleGeocoding = 'https://maps.googleapis.com/maps/api/geocode'
const params = {
  maptype: 'roadmap',
  size: '600x300',
  zoom: '15',
  markers: [
    'color:blue|label:S|40.702147,-74.015794', // example
  ],
  key: 'AIzaSyAOrI9daMiZzf1t2oPscaFD4FpPod4yTR8',
  center: 'BrooklynBridge,New York,NY', // example
}

export const getMapImage = (geolocation = {}) => {
  const { lat, lon } = geolocation
  if (lat && lon) {
    return `${googleMaps}?center=${lat},${lon}&zoom=${params.zoom}&size=${
      params.size
    }&maptype=${
      params.maptype
    }&markers=color:red%7Clabel:S%7C${lat},${lon}&key=${params.key}`
  }

  return `https://maps.googleapis.com/maps/api/staticmap?center=BrooklynBridge,New%20York,NY&zoom=0&size=600x300&maptype=roadmap&key=${
    params.key
  }`
}

export const getLocatinByGeocoding = (lat, lon) => {
  return `${googleGeocoding}/json?latlng=${lat},${lon}&key=${params.key}`
}

export const getGeocodeObg = memoize(geocode => {
  if (_.isString(geocode) && !_.isEmpty(geocode)) {
    const geodata = geocode.split('/')
    return {
      lat: Number(geodata[0]),
      lon: Number(geodata[1]),
    }
  }

  return {}
})
