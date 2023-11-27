import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  withShare,
  withJobFavourite,
  withCancelJob,
  withNamespaces,
  withPuck,
} from 'Components/HOC'

import { loadPostedJobs, removeUserJob } from 'Redux/actions/postedJobs'
import { loadAppliedJobs, cancelAppliedJob } from 'Redux/actions/appliedJobs'
import { loadBookedJobs, cancelBookedJob } from 'Redux/actions/bookedJobs'
import { loadSpecificJob } from 'Redux/actions/jobs'

import { getPostedJobs, getPostedJobsFilters } from 'Redux/selectors/postedJobs'
import {
  getAppliedJobs,
  getAppliedJobsFilters,
} from 'Redux/selectors/appliedJobs'
import { getBookedJobs, getBookedJobsFilters } from 'Redux/selectors/bookedJobs'
import { getUser } from 'Redux/selectors/user'
import { getSpecificJob } from 'Redux/selectors/jobs'

import Component from './MyJobs'

const actions = {
  onLoadPostedJobs: loadPostedJobs,
  onLoadAppliedJobs: loadAppliedJobs,
  onLoadBookedJobs: loadBookedJobs,
  onLoadJob: loadSpecificJob,
  onCancelAppliedJob: cancelAppliedJob,
  onCancelBookedJob: cancelBookedJob,
  onRemoveUserJob: removeUserJob,
}

const selectors = createStructuredSelector({
  postedJobs: getPostedJobs,
  appliedJobs: getAppliedJobs,
  bookedJobs: getBookedJobs,
  loadedJob: getSpecificJob,
  postedJobsFilters: getPostedJobsFilters,
  appliedJobsFilters: getAppliedJobsFilters,
  bookedJobsFilters: getBookedJobsFilters,
  user: getUser,
})

export default compose(
  withPuck,
  withNamespaces,
  withShare,
  withJobFavourite,
  withCancelJob,
  connect(
    selectors,
    actions,
  ),
)(Component)
