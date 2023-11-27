import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'
import { withFormik } from 'formik'

import { postUserVacancy } from 'Redux/actions/jobs'

import { updateUserJob } from 'Redux/actions/postedJobs'
import { getUser } from 'Redux/selectors/user'

import { getSpecificJob } from 'Redux/selectors/jobs'

import formikConfig from './formik'
import Component from './PostJob'

const actions = {
  onCreateJob: postUserVacancy,
  onUpdateJob: updateUserJob,
}

const selectors = createStructuredSelector({
  user: getUser,
  job: getSpecificJob,
})

export default compose(
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
  withFormik(formikConfig),
)(Component)
