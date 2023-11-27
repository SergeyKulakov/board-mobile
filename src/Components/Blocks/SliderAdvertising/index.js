import { compose } from 'redux'

import withNamespaces from 'Components/HOC/withNamespaces'
import withOrientation from 'Components/HOC/withOrientation'

import Component from './SliderAdvertising'

export default compose(
  withNamespaces,
  withOrientation,
)(Component)
