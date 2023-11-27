export default class {
  static lookUpPlaceByID = () => ({
    addressComponents: {},
    latitude: 0,
    longitude: 1
  })

  static getAutocompletePredictions = () => ([
    {
      text: 'test text',
      placeID: '1'
    },
    {
      text: 'test text',
      placeID: '2'
    },
    {
      text: 'test text',
      placeID: '3'
    }
  ])
}