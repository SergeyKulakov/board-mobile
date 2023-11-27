import moment from 'moment'
import memoize from 'memoize-one'
import { getTranslate } from 'Helpers/languages'

export const getFormatedDate = memoize(date =>
  moment(date).format('DD MMM YYYY, hh:mmA'),
)

export const getText = () => ({
  CustomerInfo: {
    title: getTranslate('jobDetail.customerInfo'),
    reviewCount: getTranslate('jobDetail.reviews'),
    otherPostedJobs: getTranslate('jobDetail.otherPostedJobs'),
  },
  PeopleList: {
    title: getTranslate('jobDetail.seePeopleWhoApplied'),
  },
  apply: getTranslate('jobDetail.applyForThisJob'),
  addToGoogle: getTranslate('myJobsDetail.googleCalendar'),
  liveTrack: getTranslate('myJobsDetail.trackServiceProvider'),
  markAsCompleted: getTranslate('findJobPage.markJobAsCompleted'),
  markAsDone: getTranslate('jobDetail.markAsDone'),
  rateReview: getTranslate('findJobPage.rateReview'),
})
