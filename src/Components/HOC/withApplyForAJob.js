import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'
import { isMatchService } from 'Helpers/user'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { applyForJob } from 'Redux/actions/applications'
import { getUser } from 'Redux/selectors/user'

import { ApplyJobModal } from 'Components/Blocks'

import withPuck from './withPuck'
import withNamespaces from './withNamespaces'

function withApplyForAJob(Component) {
  return class extends React.PureComponent {
    static propTypes = {
      _onApply: PropTypes.func,
      _user: PropTypes.object,
      onShowPuck: PropTypes.func,
      t: PropTypes.func,
      onSendNotification: PropTypes.func,
    }

    state = {
      favouriteJobId: null,
      activeJobId: null,
    }

    callback = null

    job = null

    handleOpenApplyModal = (job, callback = null) => {
      const { _user, onShowPuck, t, navigate } = this.props
      const { favouriteJobId } = this.state

      if (_.isString(favouriteJobId)) return

      if (!_user.isProvider) {
        onShowPuck({
          type: 'warning',
          message: t('apiErrors.isProviderError'),
          delay: 3500,
          text: {
            submit: t('common.openProfileWarn'),
          },
          onSubmit: () => {
            navigate.push(routes.profile)
          },
        })
      } else if (!isMatchService(job, _user)) {
        onShowPuck({
          type: 'warning',
          message: t('apiErrors.matchServiceError'),
          delay: 3500,
        })
      } else {
        this.callback = callback

        this.setState({ activeJobId: job._id })
        this.job = job
      }
    }

    handleCloseModal = () => {
      this.setState({ activeJobId: null })
      this.job = null
    }

    handleApplyJob = () => {
      const { _onApply, onShowPuck, getError } = this.props
      const { activeJobId } = this.state

      this.setState({ favouriteJobId: activeJobId })
      _onApply(activeJobId, ({ error }) => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            delay: 3000,
          })
        } else onShowPuck()
        this.setState({ favouriteJobId: null, activeJobId: null })
        if (_.isFunction(this.callback)) {
          this.callback()
          this.callback = null
        }
      })
    }

    render() {
      const { favouriteJobId, activeJobId } = this.state
      return (
        <>
          <Component
            {..._.omit(this.props, ['_onApply', '_user', 'onSendNotification'])}
            loadApplyJobId={favouriteJobId}
            onApplyJob={this.handleOpenApplyModal}
          />
          <ApplyJobModal
            loading={Boolean(favouriteJobId)}
            visible={Boolean(activeJobId)}
            onSubmit={this.handleApplyJob}
            onCancel={this.handleCloseModal}
          />
        </>
      )
    }
  }
}

const actions = {
  _onApply: applyForJob,
}

const selectors = createStructuredSelector({
  _user: getUser,
})

export default compose(
  withNamespaces,
  withPuck,
  connect(
    selectors,
    actions,
  ),
  withApplyForAJob,
)
