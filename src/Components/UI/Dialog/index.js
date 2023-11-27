import { compose } from 'redux'
import withNamespaces from 'Components/HOC/withNamespaces'
import withOrientation from 'Components/HOC/withOrientation'

import Component from './Dialog'

export default compose(
  withNamespaces,
  withOrientation,
)(Component)
