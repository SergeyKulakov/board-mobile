import _ from 'lodash'
import axios from 'axios'

const REGEX_HTTPS = /^https/
const REGEX_LOCALHOST = /http:\/\/localhost/
const urlRegex =
  // eslint-disable-next-line max-len
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export const isObject = obj => typeof obj === 'object'

export const isNil = value => value == null

export const getUrlPath = data => (data && isObject(data) ? data.url : data)

export const someProp = (data, props) =>
  data[props.find(prop => data[prop] !== null && data[prop] !== undefined)]

const apiValue = (key, value) => (value === true ? `${key}` : `${key}=${value}`)

export const defaultApiParameters = {
  video: false,
  contrast: false,
  screenshot: false,
  prerender: 'auto',
}

export const createApiUrl = props => {
  const {
    url: targetUrl,
    screenshot = null,
    prerender = null,
    contrast = null,
    video = null,
  } = props
  let url = `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`
  if (!isNil(video)) url = `${url}&${apiValue('video', video)}`
  if (!isNil(contrast) && contrast !== defaultApiParameters.contrast) {
    url = `${url}&${apiValue('palette', contrast)}`
  }
  if (!isNil(prerender) && prerender !== defaultApiParameters.prerender) {
    url = `${url}&${apiValue('prerender', prerender)}`
  }
  if (!isNil(screenshot) && screenshot !== defaultApiParameters.screenshot) {
    url = `${url}&${apiValue('screenshot', screenshot)}`
  }
  return url
}

export const fetchFromApiUrl = ({ apiKey, apiUrl }) => {
  const headers = apiKey ? { 'x-api-key': apiKey } : {}
  return fetch(apiUrl, { headers }).then(res => res.json())
}

export const fetchFromApi = props => {
  const apiUrl = createApiUrl(props)
  return fetchFromApiUrl({ apiUrl, ...props })
}

export const imageProxy = url => {
  if (!url || REGEX_LOCALHOST.test(url) || REGEX_HTTPS.test(url)) return url
  return `https://images.weserv.nl/?url=${encodeURIComponent(url).replace(
    'http://',
    '',
  )}`
}

// from web app

export const getMicrolinkObg = async ({ url }) => {
  if (!_.isString(url) || !urlRegex.test(url)) {
    return {
      error: 'invalidUrl',
    }
  }

  try {
    const api = 'https://api.microlink.io'

    const response = await axios.get(`${api}?url=${url}&video=true&audio=true`)
    if (response.data.status === 'success') {
      return {
        data: _.get(response, 'data.data', {}),
        error: false,
      }
    }

    return {
      data: _.get(response, 'data.data', {}),
      error: true,
    }
  } catch (err) {
    return {
      data: {},
      error: true,
    }
  }
}
