import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withNamespaces from 'Components/HOC/withNamespaces'

import { loadSpecificServiceProvider } from 'Redux/actions/serviceProviders'

import { getSpecificServiceProvider } from 'Redux/selectors/serviceProviders'
import { getUser } from 'Redux/selectors/user'

import Component from './DoerInfo'

const actions = {
  onLoadSP: loadSpecificServiceProvider,
}

const selectors = createStructuredSelector({
  profile: getSpecificServiceProvider,
  user: getUser,
})

export default compose(
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
