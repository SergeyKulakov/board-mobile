import _ from 'lodash'
import { getUser } from 'Redux/selectors/user'
import { isUSA } from 'Helpers/user'
import memoize from 'memoize-one'

export const getLinkArray = links => {
  if (_.isArray(links) && !_.isEmpty(links)) {
    return links.map((link, index) => ({
      link,
      image: null,
      _needUpdate: true,
      title: null,
      id: index,
    }))
  }

  return []
}

export const getParamsWithUnits = memoize(({ params }, store) => {
  const user = getUser(store.getState())

  return {
    params: {
      ...params,
      length_units: isUSA(user) ? 'mile' : 'kilometre',
    },
  }
})
