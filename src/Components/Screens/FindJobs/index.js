import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  withShare,
  withNamespaces,
  withJobFavourite,
  withApplyForAJob,
  withPuck,
} from 'Components/HOC'

import { loadJobsList, loadSpecificJob, removeJob } from 'Redux/actions/jobs'

import {
  getJobsList,
  getSpecificJob,
  getIsEndJobsList,
  getJobsPage,
  getJobsFilters,
} from 'Redux/selectors/jobs'
import { getUser } from 'Redux/selectors/user'

import Component from './FindJobs'

const actions = {
  onLoadJobsList: loadJobsList,
  onLoadSpecificJob: loadSpecificJob,
  onRemoveVacancy: removeJob,
}

const selectors = createStructuredSelector({
  jobsList: getJobsList,
  specificJob: getSpecificJob,
  isEndJobsList: getIsEndJobsList,
  jobsPage: getJobsPage,
  jobsFilters: getJobsFilters,
  user: getUser,
})

export default compose(
  withShare,
  withNamespaces,
  withPuck,
  withJobFavourite,
  withApplyForAJob,
  connect(
    selectors,
    actions,
  ),
)(Component)
