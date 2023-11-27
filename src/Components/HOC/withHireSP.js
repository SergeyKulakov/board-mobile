import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'
import { navigation } from 'Helpers/navigation'
import * as routes from 'Constants/routes'

import { SelectDateModal } from 'Components/Blocks'

import {
  acceptApplication,
  hireOnApplication,
  rejectApplication,
} from 'Redux/actions/applications'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getUser } from 'Redux/selectors/user'

import { withPuck, withNamespaces } from './index'

function withHireSP(Component) {
  return class extends React.Component {
    static propTypes = {
      _job: PropTypes.object,
      _user: PropTypes.object,
      accept: PropTypes.func,
      reject: PropTypes.func,
      hire: PropTypes.func,
      onShowPuck: PropTypes.func,
      getError: PropTypes.func,
    }

    constructor(props) {
      super(props)

      this.state = {
        loadApplicationId: null,
        activeHireProfileId: null,
        budget: _.get(props, '_job.budget', 0),
        currencyCode: _.get(props, '_job.currency', 'USD'),
      }

      this.onSuccess = null
    }

    showError = error => {
      const { onShowPuck, getError } = this.props

      onShowPuck({
        type: 'error',
        message: getError(error),
      })
    }

    handleAccept = (application, callback) => {
      const { accept, onShowPuck } = this.props

      this.setState({ loadApplicationId: application._id })
      accept(application._id, ({ error }) => {
        this.setState({ loadApplicationId: null })
        if (error) this.showError(error)
        else onShowPuck({ callback })
      })
    }

    handleReject = (application, callback) => {
      const { _job, reject, onShowPuck } = this.props

      if (_.get(_job, 'peopleWhoApplied', []).length === 1) {
        onShowPuck({
          callback,
        })
      }

      reject(application._id, ({ error }) => {
        if (error) this.showError(error)
        else onShowPuck()
      })
    }

    handleOpenHireModal = ({ userId }, callback) => {
      this.setState({ activeHireProfileId: userId })

      this.onSuccess = callback
    }

    handleDateModalClose = () => this.setState({ activeHireProfileId: null })

    handleOpenCurrencyModal = () => {
      const { currencyCode } = this.state
      navigation.showModal(routes.currencyModal, {
        activeCode: currencyCode,
        onSubmit: ({ code }) => {
          this.setState({ currencyCode: code })
        },
      })
    }

    handleChangeBudget = budget => this.setState({ budget })

    handleHire = (date, callback) => {
      const { hire, _job, onShowPuck } = this.props
      const { activeHireProfileId, budget, currencyCode } = this.state

      const request = {
        userId: activeHireProfileId,
        jobId: _job._id,
        startDate: moment(date).valueOf(),
        budget,
        currency: currencyCode,
      }

      hire(request, ({ error }) => {
        this.handleDateModalClose()
        if (error) this.showError(error)
        else {
          if (_.isFunction(callback)) callback()

          onShowPuck({
            type: 'success',
            callback: this.onSuccess,
          })
          this.onSuccess = null
        }
      })
    }

    render() {
      const {
        activeHireProfileId,
        loadApplicationId,
        budget,
        currencyCode,
      } = this.state

      return (
        <>
          <Component
            {..._.omit(this.props, [
              'accept',
              'reject',
              'hire',
              '_job',
              '_user',
            ])}
            onAccept={this.handleAccept}
            onReject={this.handleReject}
            onHire={this.handleOpenHireModal}
            loadApplicationId={loadApplicationId}
          />
          <SelectDateModal
            onClickCurrency={this.handleOpenCurrencyModal}
            onChangeBudget={this.handleChangeBudget}
            onCancel={this.handleDateModalClose}
            onSubmit={this.handleHire}
            isVisible={Boolean(activeHireProfileId)}
            budget={budget}
            currencyCode={currencyCode}
          />
        </>
      )
    }
  }
}

const actions = {
  accept: acceptApplication,
  reject: rejectApplication,
  hire: hireOnApplication,
}

const selectors = createStructuredSelector({
  _job: getSpecificJob,
  _user: getUser,
})

export default compose(
  withNamespaces,
  withPuck,
  connect(
    selectors,
    actions,
  ),
  withHireSP,
)
