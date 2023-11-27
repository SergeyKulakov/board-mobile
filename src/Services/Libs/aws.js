import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv'

const AWS = require('aws-sdk')

const AWScreds = new AWS.Credentials({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
})

export { AWScreds }
