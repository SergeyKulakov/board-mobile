import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'

export const LOAD_SERVICES = createAsyncAction('services/LOAD')
export const loadServices = ({ callback = () => {} }) =>
  apiCall({
    endpoint: '/services',
    types: LOAD_SERVICES,
    callback,
  })

export const LOAD_POPULAR_SERVICES = createAsyncAction('services/LOAD_POPULAR')
export const loadPopularServices = ({ callback = () => {} }) =>
  apiCall({
    endpoint: '/services/popular',
    types: LOAD_POPULAR_SERVICES,
    callback,
  })
