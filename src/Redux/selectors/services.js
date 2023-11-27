import { createSelector } from 'reselect'

const servicesData = store => store.services

export const getCategories = createSelector(
  servicesData,
  data => data.categories,
)
export const getServicesLoadInfo = createSelector(
  servicesData,
  data => data.loadInfo,
)
export const getPopularServices = createSelector(
  servicesData,
  data => data.popularServices,
)
