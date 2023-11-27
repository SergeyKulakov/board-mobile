import { MERCHANT_IDENTIFIER } from 'react-native-dotenv'

const METHOD_DATA = [
  {
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: MERCHANT_IDENTIFIER,
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
    },
  },
]

const OPTIONS = {}

export default {
  METHOD_DATA,
  OPTIONS,
}
