import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { withNamespaces, withPuck } from 'Components/HOC'

import { loadServices, loadPopularServices } from 'Redux/actions/services'

import { getPopularServices, getCategories } from 'Redux/selectors/services'
import { getUser } from 'Redux/selectors/user'

import Component from './FilterJobs'

const actions = {
  onLoadServices: loadServices,
  onLoadPopularServices: loadPopularServices,
}

const selectors = createStructuredSelector({
  popularServices: getPopularServices,
  categories: getCategories,
  user: getUser,
})

export default compose(
  withNamespaces,
  withPuck,
  connect(
    selectors,
    actions,
  ),
)(Component)
