import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withNamespaces from 'Components/HOC/withNamespaces'

import { loadServices } from 'Redux/actions/services'

import { getCategories } from 'Redux/selectors/services'

import Component from './ServicesAutocomplete'

const actions = {
  onLoadCategories: loadServices,
}

const selectors = createStructuredSelector({
  categories: getCategories,
})

export default compose(
  withNamespaces,
  connect(
    selectors,
    actions,
  ),
)(Component)
