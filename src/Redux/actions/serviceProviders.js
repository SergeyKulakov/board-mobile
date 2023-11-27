import { createAsyncAction } from 'Helpers/redux'
import { apiCall } from 'Redux/actions/api'
import { getParamsWithUnits } from 'Helpers/redux/user'

import { SERVICE_PROVIDERS_ELEMENTS_PER_PAGE } from 'Constants/pagination'

export const LOAD_SERVICE_PROVIDERS = createAsyncAction('serviceProviders/LOAD')
export const loadServiceProviders = ({
  filters,
  isPagination = false,
  savedFilters,
  isClearRemoved = false,
  callback = () => {},
}) =>
  apiCall({
    endpoint: '/service-providers',
    types: LOAD_SERVICE_PROVIDERS,
    method: 'GET',
    params: {
      ...filters,
      elements_per_page: SERVICE_PROVIDERS_ELEMENTS_PER_PAGE,
    },
    meta: {
      isPagination,
      filters: savedFilters,
      isClearRemoved,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const LOAD_POPULAR_SERVICE_PROVIDERS = createAsyncAction(
  'serviceProviders/LOAD_POPULAR',
)
export const loadPopularServiceProviders = callback =>
  apiCall({
    endpoint: '/service-providers',
    types: LOAD_POPULAR_SERVICE_PROVIDERS,
    method: 'GET',
    params: {
      elements_per_page: 40,
      order: 'asc',
      page_number: 0,
      radius: 999999999,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const LOAD_SPECIFIC_SERVICE_PROVIDER = createAsyncAction(
  'serviceProviders/LOAD_SPECIFIC',
)
export const loadSpecificServiceProvider = (userName, callback) =>
  apiCall({
    endpoint: `/service-provider/${userName}`,
    types: LOAD_SPECIFIC_SERVICE_PROVIDER,
    method: 'GET',
    callback,
    preFormat: getParamsWithUnits,
  })

// favorite
export const LOAD_FAVORITES = createAsyncAction(
  'serviceProviders/LOAD_FAVORITES',
)
export const loadFavoritesServiceProviders = callback =>
  apiCall({
    endpoint: '/favourites/service-provider/list',
    types: LOAD_FAVORITES,
    params: {
      elements_per_page: 1000,
      no_geolocation_filter: true,
    },
    preFormat: getParamsWithUnits,
    callback,
  })

export const ADD_FAVORITE = createAsyncAction('serviceProviders/ADD_FAVORITE')
export const addFavoriteServiceProvider = (userName, callback) =>
  apiCall({
    endpoint: '/favourites/service-provider',
    types: ADD_FAVORITE,
    method: 'POST',
    query: {
      spId: userName,
    },
    callback,
  })

export const DELETE_FAVORITE = createAsyncAction(
  'serviceProviders/DELETE_FAVORITE',
)
export const deleteFavoriteServiceProvider = (favouriteId, callback) =>
  apiCall({
    endpoint: '/favourites/service-provider',
    types: DELETE_FAVORITE,
    method: 'DELETE',
    query: {
      favouriteSpId: favouriteId,
    },
    meta: {
      id: favouriteId,
    },
    callback,
  })

export const REMOVE_SERVICE_PROVIDER = 'serviceProviders/REMOVE'
export const removeServiceProvider = username => ({
  type: REMOVE_SERVICE_PROVIDER,
  username,
})

export const SEND_REPORT = createAsyncAction('serviceProviders/SEND_REPORT')
export const sendReport = ({ userId, message }, callback) =>
  apiCall({
    endpoint: '/user-report',
    types: SEND_REPORT,
    method: 'POST',
    query: {
      userId,
      message,
    },
    callback,
  })
