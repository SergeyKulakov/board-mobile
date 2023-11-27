import { createReducer } from 'Helpers/redux'
import { filteredRemovedServiceProviders } from 'Helpers/redux/removedItems'
import { getLinkArray } from 'Helpers/redux/user'
import _ from 'lodash'

import {
  LOAD_SERVICE_PROVIDERS,
  LOAD_POPULAR_SERVICE_PROVIDERS,
  LOAD_SPECIFIC_SERVICE_PROVIDER,
  LOAD_FAVORITES,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  REMOVE_SERVICE_PROVIDER,
} from 'Redux/actions/serviceProviders'
import { SIGN_OUT } from 'Redux/actions/auth'

const initialState = {
  serviceProviders: [],
  popularServiceProviders: [],
  specificServiceProvider: {},
  favourites: [],
  filters: {},
  removedIds: [],
  // pagination
  page: 0,
  isEndList: false,
}

const handlers = {
  [LOAD_SERVICE_PROVIDERS.REQUEST]: (state, { meta }) => ({
    ...state,
    filters: meta.filters || {},
    removedIds: meta.isClearRemoved ? [] : state.removedIds,
  }),
  [LOAD_SERVICE_PROVIDERS.SUCCESS]: (
    state,
    { payload, meta: { isPagination } },
  ) => ({
    ...state,
    serviceProviders: isPagination
      ? filteredRemovedServiceProviders(
          [...state.serviceProviders, ...payload.list],
          state.removedIds,
        )
      : filteredRemovedServiceProviders(payload.list, state.removedIds),
    isEndList: payload.isListEnd,
    page: isPagination ? state.page + 1 : 0,
  }),
  [LOAD_POPULAR_SERVICE_PROVIDERS.SUCCESS]: (state, { payload }) => ({
    ...state,
    popularServiceProviders: filteredRemovedServiceProviders(
      payload.list,
      state.removedIds,
    ),
  }),
  [LOAD_SPECIFIC_SERVICE_PROVIDER.SUCCESS]: (state, { payload }) => ({
    ...state,
    specificServiceProvider: {
      ...payload,
      videoLinks: getLinkArray(payload.videoLinks),
      websiteLinks: getLinkArray(payload.websiteLinks),
    },
  }),
  [LOAD_FAVORITES.SUCCESS]: (state, { payload }) => ({
    ...state,
    favourites: payload.list,
  }),
  [ADD_FAVORITE.SUCCESS]: (state, { payload: { spId, _id } }) => ({
    ...state,
    serviceProviders: state.serviceProviders.map(el =>
      el._id === spId ? { ...el, favouriteId: _id } : el,
    ),
    specificServiceProvider:
      _.get(state, 'specificServiceProvider.username', {}) === spId
        ? { ...state.specificServiceProvider, favouriteId: _id }
        : state.specificServiceProvider,
  }),
  [DELETE_FAVORITE.SUCCESS]: (state, { meta: { id } }) => ({
    ...state,
    serviceProviders: state.serviceProviders.map(el =>
      el.favouriteId === id ? { ...el, favouriteId: null } : el,
    ),
    favourites: (state.favourites || []).filter(el => el.favouriteId !== id),
    specificServiceProvider:
      (state.specificServiceProvider || {}).favouriteId === id
        ? { ...state.specificServiceProvider, favouriteId: undefined }
        : state.specificServiceProvider,
  }),
  [SIGN_OUT.REQUEST]: () => initialState,
  [REMOVE_SERVICE_PROVIDER]: (state, { username }) => ({
    ...state,
    serviceProviders: state.serviceProviders.filter(
      el => el.username !== username,
    ),
    popularServiceProviders: state.popularServiceProviders.filter(
      el => el.username !== username,
    ),
    removedIds: [...state.removedIds, username],
  }),
}

export default createReducer(initialState, handlers)
