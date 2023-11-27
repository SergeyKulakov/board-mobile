import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withHireSP, withPuck, withNamespaces } from 'Components/HOC'

import { loadSpecificServiceProvider } from 'Redux/actions/serviceProviders'

import { getSpecificServiceProvider } from 'Redux/selectors/serviceProviders'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getCategories } from 'Redux/selectors/services'
import { getUser } from 'Redux/selectors/user'

import Component from './PeopleWhoApplied'

const actions = {
  onLoadSPProfile: loadSpecificServiceProvider,
}

const selectors = createStructuredSelector({
  job: getSpecificJob,
  services: getCategories,
  user: getUser,
  loadedSP: getSpecificServiceProvider,
})

export default compose(
  withHireSP,
  withPuck,
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
