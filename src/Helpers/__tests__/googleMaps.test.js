import {
  getGeocodeObg,
  getLocatinByGeocoding,
  getMapImage,
} from '../googleMaps'

describe('Helpers/googleMaps', () => {
  describe('getGeocodeObg', () => {
    it('successful', () => {
      const data = '13.3214/32.3214'

      const result = getGeocodeObg(data)

      expect(result).toStrictEqual({
        lat: 13.3214,
        lon: 32.3214,
      })
    })

    it('should return empty object by default', () => {
      expect(getGeocodeObg('')).toStrictEqual({})
      expect(getGeocodeObg(1)).toStrictEqual({})
    })
  })

  it('getLocatinByGeocoding', () => {
    const lat = '13.4231'
    const lon = '32.4214'

    const result = getLocatinByGeocoding(lat, lon)

    expect(result).toStrictEqual(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=13.4231,32.4214&key=AIzaSyAOrI9daMiZzf1t2oPscaFD4FpPod4yTR8',
    )
  })

  describe('getMapImage', () => {
    it('with geolocation', () => {
      const request = {
        lat: '13.3214',
        lon: '32.3214',
      }

      const result = getMapImage(request)
      expect(result).toStrictEqual(
        'https://maps.googleapis.com/maps/api/staticmap?center=13.3214,32.3214&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C13.3214,32.3214&key=AIzaSyAOrI9daMiZzf1t2oPscaFD4FpPod4yTR8',
      )
    })

    it('return by default', () => {
      const result = getMapImage()

      expect(result).toStrictEqual(
        'https://maps.googleapis.com/maps/api/staticmap?center=BrooklynBridge,New%20York,NY&zoom=0&size=600x300&maptype=roadmap&key=AIzaSyAOrI9daMiZzf1t2oPscaFD4FpPod4yTR8',
      )
    })
  })
})
