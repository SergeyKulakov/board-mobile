import { DEFAULT_BUCKET_NAME } from 'react-native-dotenv'

const AWS = require('aws-sdk')
const { AWScreds } = require('./aws')

const s3 = new AWS.S3({
  credentials: AWScreds,
  signatureVersion: 'v4',
  region: 'us-east-1',
  s3DisableBodySigning: false,
})

export const call = (action, params) => {
  if (!params.Bucket) {
    params.Bucket = DEFAULT_BUCKET_NAME
  }

  return s3[action](params).promise()
}

export const instance = s3
