import React from 'react'
import _ from 'lodash'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { addFavoriteJob, deleteFavoriteJob } from 'Redux/actions/jobs'

import withPuck from './withPuck'
import withNamespaces from './withNamespaces'

const removedPropsKeys = ['onAdd', 'onDelete', 'onShowPuck', 't', 'getError']

const withJobFavourite = Component => {
  return class extends React.Component {
    state = {
      loadingJobId: false,
    }

    handleFavouriteClick = vacancy => {
      const { onAdd, onDelete, onShowPuck, getError } = this.props
      this.setState({ loadingJobId: vacancy._id })

      if (_.isString(vacancy.favouriteId)) {
        onDelete(vacancy.favouriteId, ({ error }) => {
          this.setState({ loadingJobId: null })
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
            })
          }
        })
      } else {
        onAdd(vacancy._id, ({ error }) => {
          this.setState({ loadingJobId: null })
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
            })
          }
        })
      }
    }

    render() {
      const { loadingJobId } = this.state

      const props = _.omit(this.props, removedPropsKeys)

      return (
        <Component
          {...props}
          loadingJobId={loadingJobId}
          onFavouriteClick={this.handleFavouriteClick}
        />
      )
    }
  }
}

const actions = {
  onAdd: addFavoriteJob,
  onDelete: deleteFavoriteJob,
}

export default compose(
  withNamespaces,
  withPuck,
  connect(
    null,
    actions,
  ),
  withJobFavourite,
)
