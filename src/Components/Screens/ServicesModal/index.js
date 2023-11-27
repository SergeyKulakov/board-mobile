import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// actions
import { loadPopularServices, loadServices } from 'Redux/actions/services'

// selectors
import { getCategories, getPopularServices } from 'Redux/selectors/services'
import { getUser } from 'Redux/selectors/user'

import Component from './ServicesModal'

const actions = {
  onLoadPopularServices: loadPopularServices,
  onLoadServices: loadServices,
}

const selectors = createStructuredSelector({
  popularServices: getPopularServices,
  categories: getCategories,
  user: getUser,
})

export default connect(
  selectors,
  actions,
)(Component)
