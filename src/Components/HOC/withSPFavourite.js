import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getError } from 'Helpers/errors'

import {
  addFavoriteServiceProvider,
  deleteFavoriteServiceProvider,
} from 'Redux/actions/serviceProviders'

import { withToastify } from './index'

function withSPFavourite(Component) {
  return class extends React.PureComponent {
    static propTypes = {
      onAdd: PropTypes.func,
      onDelete: PropTypes.func,
      toast: PropTypes.func,
    }

    state = {
      loadSPId: null,
    }

    handleFavourite = ({ username, favouriteId }) => {
      const { onAdd, onDelete, toast } = this.props
      this.setState({ loadSPId: username })

      if (_.isString(favouriteId)) {
        onDelete(favouriteId, ({ error }) => {
          if (error) toast(getError(error))
          this.setState({ loadSPId: null })
        })
      } else {
        onAdd(username, ({ error }) => {
          if (error) toast(getError(error))
          this.setState({ loadSPId: null })
        })
      }
    }

    render() {
      const { loadSPId } = this.state

      return (
        <Component
          {..._.omit(this.props, ['onAdd', 'onDelete', 'toast'])}
          loadSPId={loadSPId}
          onFavouriteSPClick={this.handleFavourite}
        />
      )
    }
  }
}

const actions = {
  onAdd: addFavoriteServiceProvider,
  onDelete: deleteFavoriteServiceProvider,
}

export default compose(
  connect(
    null,
    actions,
  ),
  withToastify,
  withSPFavourite,
)
