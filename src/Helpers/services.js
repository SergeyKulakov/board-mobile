import i18n from 'I18N'
import _ from 'lodash'
import { getTranslate } from './languages'

export const sortedService = services =>
  services.sort((a, b) => a.popularity > b.popularity)

export function filteredServices(items = [], value = '') {
  return items.filter(el => {
    if (!_.isEmpty(el.subservices)) {
      const isApprove = el.subservices.find(item => {
        const title = i18n.t('services')[item.title]
        return (title || '').toLowerCase().indexOf(value.toLowerCase()) !== -1
      })

      if (isApprove) return true
    }
    const title = i18n.t('services')[el.title]
    return (title || '').toLowerCase().indexOf(value.toLowerCase()) !== -1
  })
}

export const getCurrentService = (services, serviceId, categoryId) => {
  let result = null

  services.forEach(el => {
    if (el._id === serviceId || el._id === categoryId) result = el
    else if (!_.isEmpty(el.subservices)) {
      const subService = el.subservices.find(({ _id }) => _id === serviceId)
      if (subService)
        result = {
          ...subService,
          parentCategory: el,
        }
    }
  })

  return result
}

export const getServiceTitle = key =>
  _.isString(key) ? i18n.t('services')[key] : ''

export const getServiceMoreString = services => {
  if (_.isEmpty(services) || !_.isArray(services)) return ''

  const serviceTitleKey = _.get(services, '[0].title', '')
  if (services.length === 1) {
    return `${getTranslate(serviceTitleKey)}`
  }

  return `${getTranslate(serviceTitleKey)} & ${services.length -
    1} ${getTranslate('appServiceProviders.More')}`
}
