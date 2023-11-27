import { compose } from 'redux'
import { connect } from 'react-redux'

import { withNamespaces, withPuck } from 'Components/HOC'

import { sendReport } from 'Redux/actions/serviceProviders'

import Component from './UserReport'

const actions = {
  onSubmit: sendReport,
}

export default compose(
  withPuck,
  withNamespaces,
  connect(
    null,
    actions,
  ),
)(Component)
