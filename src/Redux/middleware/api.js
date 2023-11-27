import get from 'lodash/get'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import assign from 'lodash/assign'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import _ from 'lodash'

import axios from 'axios'

import { API_CALL } from 'Constants/ids'

import {
  REFRESH_TOKENS,
  signOut,
  UPDATE_TOKEN,
  updateToken,
} from 'Redux/actions/auth'
import { SET_PREFERRED_LANGUAGE } from 'Redux/actions/settings'

import { getAccessToken } from 'Redux/selectors/auth'
import { apiUrl } from 'Constants/api'

export const ApiService = {
  apiCall: (
    url = '',
    endpoint = '',
    method = 'GET',
    query = {},
    headers = {},
    attachType,
    attach,
    params,
    postFormat,
    preFormat,
  ) => {
    const HTTPMethod = method.toLowerCase()

    let formattedRequest = {}

    if (isFunction(preFormat)) {
      formattedRequest = preFormat({ query, headers, params }) || {}
    }

    const api = axios.create({
      baseURL: url || apiUrl,
      headers: formattedRequest.headers || headers,
      params: formattedRequest.params || params,
      timeout: 20000,
    })

    if (__DEV__) {
      console.log('params: ', formattedRequest.params || params)
      console.log('headers: ', formattedRequest.headers || headers)
      console.log('request url: ', `${url}${endpoint}`)
      console.log('request body: ', query)
    }

    const body =
      method === 'DELETE'
        ? { data: formattedRequest.query || query }
        : formattedRequest.query || query

    return new Promise((resolve, reject) => {
      api[HTTPMethod](endpoint, body)
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response.data)
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }
        })
    })
  },
}

const nextAction = (action, data) => {
  const next = merge({}, action, data)
  delete next[API_CALL]
  return next
}

export default store => next => action => {
  if (action.type !== API_CALL || !action.fields) return next(action)
  const {
    url,
    postFormat,
    preFormat,
    endpoint,
    headers,
    method,
    query,
    params,
    types,
    attachType,
    attach,
    auth,
    callback,
  } = action.fields

  const format = {
    post: isFunction(postFormat) ? data => postFormat(data, store) : undefined,
    pre: isFunction(preFormat) ? data => preFormat(data, store) : undefined,
  }

  const signature = Date.now()

  const token = auth || getAccessToken(store.getState())

  const completeHeaders = assign(
    isEmpty(attach) && {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-caching',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    {},
    headers,
  )

  const fsaFields = pick(action.fields, 'payload', 'error', 'meta')
  const isLoadRequest =
    !method ||
    method.toUpperCase() === 'GET' ||
    method.toUpperCase() === 'PATCH' ||
    method.toUpperCase() === 'POST'

  const invokedAction = nextAction(fsaFields, {
    type: types.REQUEST,
    meta: merge({ signature }, isLoadRequest && { endpoint, isRequest: true }),
    query,
  })

  next(invokedAction)

  const onError = error => {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('onError =====>>>', error)
    }
    const data = {
      payload: error,
      type: types.FAILURE,
      meta: {
        signature,
        httpCode: error.status,
        endpoint,
      },
      error: true,
    }

    if (
      error === 'Unauthorized' ||
      error.message === 'Unauthorized' ||
      error.payload === 'Unauthorized' ||
      _.get(error, 'payload.code') === 'Unauthorized' ||
      _.get(error, 'payload.message') === 'Unauthorized' ||
      error.message === 'Network Error' ||
      error.message === 'Access Token has expired'
    ) {
      if (_.eq(types, UPDATE_TOKEN) || _.eq(types, REFRESH_TOKENS)) {
        store.dispatch(signOut())
      } else if (types !== SET_PREFERRED_LANGUAGE) {
        next(updateToken(action))

        return data
      }
    }

    if (_.has(data, 'payload._timedOut')) {
      data.payload = {
        message: '409 Request Timeout',
      }
    }

    next(nextAction(fsaFields, data))
    if (isFunction(callback)) callback({ error: data })
    return data
  }

  const onSuccess = response => {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('onSuccess =====>>>', response)
    }

    const meta = merge(
      { signature },
      isLoadRequest && { endpoint, isSuccess: true },
    )
    const payload = get(response, 'data')

    const result = isFunction(postFormat) ? postFormat(payload, store) : payload

    if (_.isObject(result.error)) {
      onError(result.error)
      return
    }

    const data = { meta, payload: result, type: types.SUCCESS }
    next(nextAction(fsaFields, data))
    if (isFunction(callback)) callback(data)
    return data
  }

  const apiRequest = ApiService.apiCall(
    url,
    endpoint,
    method,
    query,
    completeHeaders,
    attachType,
    attach,
    params,
    format.post,
    format.pre,
  )
  return apiRequest
    .then(onSuccess, onError)
    .catch(error => console.error('Request error', error))
}
