import { getParamsWithUnits } from 'Helpers/redux/user'
import { SERVICE_PROVIDERS_ELEMENTS_PER_PAGE } from 'Constants/pagination'
import {
  loadFavoritesServiceProviders,
  addFavoriteServiceProvider,
  deleteFavoriteServiceProvider,
  loadPopularServiceProviders,
  loadServiceProviders,
  loadSpecificServiceProvider,
  removeServiceProvider,
  sendReport,
} from '../serviceProviders'

describe('serviceProviders', () => {
  const callback = () => null

  it('loadFavoritesServiceProviders', () => {
    const args = [callback]
    const result = loadFavoritesServiceProviders(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/favourites/service-provider/list',
        types: {
          REQUEST: 'serviceProviders/LOAD_FAVORITES.REQUEST',
          SUCCESS: 'serviceProviders/LOAD_FAVORITES.SUCCESS',
          FAILURE: 'serviceProviders/LOAD_FAVORITES.FAILURE',
        },
        params: {
          elements_per_page: 1000,
          no_geolocation_filter: true,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('addFavoriteServiceProvider', () => {
    const args = ['userName', callback]
    const result = addFavoriteServiceProvider(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/favourites/service-provider',
        types: {
          REQUEST: 'serviceProviders/ADD_FAVORITE.REQUEST',
          SUCCESS: 'serviceProviders/ADD_FAVORITE.SUCCESS',
          FAILURE: 'serviceProviders/ADD_FAVORITE.FAILURE',
        },
        method: 'POST',
        query: {
          spId: 'userName',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('deleteFavoriteServiceProvider', () => {
    const args = ['favouriteId', callback]
    const result = deleteFavoriteServiceProvider(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/favourites/service-provider',
        types: {
          REQUEST: 'serviceProviders/DELETE_FAVORITE.REQUEST',
          SUCCESS: 'serviceProviders/DELETE_FAVORITE.SUCCESS',
          FAILURE: 'serviceProviders/DELETE_FAVORITE.FAILURE',
        },
        method: 'DELETE',
        query: {
          favouriteSpId: 'favouriteId',
        },
        meta: {
          id: 'favouriteId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadPopularServiceProviders', () => {
    const args = [callback]
    const result = loadPopularServiceProviders(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/service-providers',
        types: {
          REQUEST: 'serviceProviders/LOAD_POPULAR.REQUEST',
          SUCCESS: 'serviceProviders/LOAD_POPULAR.SUCCESS',
          FAILURE: 'serviceProviders/LOAD_POPULAR.FAILURE',
        },
        method: 'GET',
        params: {
          elements_per_page: 40,
          order: 'asc',
          page_number: 0,
          radius: 999999999,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadServiceProviders', () => {
    const args = [
      {
        filters: { filter: 'filter' },
        isPagination: false,
        savedFilters: {},
        isClearRemoved: false,
        callback,
      },
    ]
    const result = loadServiceProviders(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/service-providers',
        types: {
          REQUEST: 'serviceProviders/LOAD.REQUEST',
          SUCCESS: 'serviceProviders/LOAD.SUCCESS',
          FAILURE: 'serviceProviders/LOAD.FAILURE',
        },
        method: 'GET',
        params: {
          filter: 'filter',
          elements_per_page: SERVICE_PROVIDERS_ELEMENTS_PER_PAGE,
        },
        meta: {
          isPagination: false,
          filters: {},
          isClearRemoved: false,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadSpecificServiceProvider', () => {
    const args = ['userName', callback]
    const result = loadSpecificServiceProvider(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/service-provider/userName`,
        types: {
          REQUEST: 'serviceProviders/LOAD_SPECIFIC.REQUEST',
          SUCCESS: 'serviceProviders/LOAD_SPECIFIC.SUCCESS',
          FAILURE: 'serviceProviders/LOAD_SPECIFIC.FAILURE',
        },
        method: 'GET',
        callback,
        preFormat: getParamsWithUnits,
      },
      type: 'API_CALL',
    })
  })

  it('removeServiceProvider', () => {
    const args = ['userName']
    const result = removeServiceProvider(...args)

    expect(result).toStrictEqual({
      type: 'serviceProviders/REMOVE',
      username: 'userName',
    })
  })

  it('sendReport', () => {
    const args = [{ userId: 'userId', message: 'message' }, callback]
    const result = sendReport(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/user-report',
        types: {
          REQUEST: 'serviceProviders/SEND_REPORT.REQUEST',
          SUCCESS: 'serviceProviders/SEND_REPORT.SUCCESS',
          FAILURE: 'serviceProviders/SEND_REPORT.FAILURE',
        },
        method: 'POST',
        query: {
          userId: 'userId',
          message: 'message',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
