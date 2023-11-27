import { createSelector } from 'reselect'

const serviceProvidersData = store => store.serviceProviders

export const getServiceProvidersList = createSelector(
  serviceProvidersData,
  data => data.serviceProviders,
)
export const getPopularServiceProviders = createSelector(
  serviceProvidersData,
  data => data.popularServiceProviders,
)
export const getSpecificServiceProvider = createSelector(
  serviceProvidersData,
  data => data.specificServiceProvider,
)
export const getFavoritesServiceProviders = createSelector(
  serviceProvidersData,
  data => data.favourites,
)
export const getServiceProvidersPage = createSelector(
  serviceProvidersData,
  data => data.page,
)
export const getServiceProvidersIsEndList = createSelector(
  serviceProvidersData,
  data => data.isEndList,
)
export const getServiceProvidersFilters = createSelector(
  serviceProvidersData,
  data => data.filters,
)
