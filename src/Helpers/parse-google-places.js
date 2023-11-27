export default function parsePlace(place = {}) {
  const byType = (place.address_components || []).reduce((acc, data) => {
    data.types.forEach(type => {
      acc[type] = data
    })
    return acc
  }, {})

  const result = {
    streetNumber: placeGet('street_number'),
    streetName: placeGet('route'),
    city:
      placeGet('locality') ||
      placeGet('sublocality') ||
      placeGet('sublocality_level_1') ||
      placeGet('neighborhood') ||
      placeGet('administrative_area_level_3') ||
      placeGet('administrative_area_level_2'),
    county: placeGet('administrative_area_level_2'),
    stateShort: placeGet('administrative_area_level_1', true),
    stateLong: placeGet('administrative_area_level_1'),
    countryShort: placeGet('country', true),
    countryLong: placeGet('country'),
    zipCode: placeGet('postal_code'),
    lat: place.geometry.location.lat,
    lon: place.geometry.location.lng,
  }

  result.address = result.streetNumber
    ? `${result.streetNumber} ${result.streetName}`
    : result.streetName

  return result

  function placeGet(key, short) {
    if (!(key in byType)) return ''

    return short ? byType[key].short_name : byType[key].long_name
  }
}
