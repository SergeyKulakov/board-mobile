import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces } from 'Components/HOC'

import { getCategories } from 'Redux/selectors/services'

import Component from './SubServicesModal'

const actions = {}

const selectors = createStructuredSelector({
  data: getCategories,
})

export default compose(
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
