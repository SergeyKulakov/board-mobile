import { compose } from 'redux'
import { connect } from 'react-redux'

import withNamespaces from 'Components/HOC/withNamespaces'

import { federatedSignIn } from 'Redux/actions/auth'

import Component from './SocialAuthBlock'

const actions = {
  onFederatedSignIn: federatedSignIn,
}

export default compose(
  withNamespaces,
  connect(
    null,
    actions,
  ),
)(Component)
