import moment from 'moment'
import _ from 'lodash'

export const isResolveTracking = (job, user = {}) => {
  const date = moment(_.get(job, 'startDate'))
  const twoHoursLater = moment().add({ minute: user.isPremium ? 40 : 35 })

  return (
    !date.isBefore(moment().subtract(30, 'minute')) &&
    !date.isAfter(twoHoursLater)
  )
}
