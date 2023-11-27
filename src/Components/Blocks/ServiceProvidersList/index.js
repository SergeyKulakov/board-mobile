import { compose } from 'redux'

import withOrientation from 'Components/HOC/withOrientation'

import Component from './ServiceProvidersList'

export default compose(withOrientation)(Component)
