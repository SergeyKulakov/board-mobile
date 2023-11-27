import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { navigation } from 'Helpers/navigation'
import * as routes from 'Constants/routes'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { connectToChat } from 'Redux/actions/chats'
import { getSpecificJob } from 'Redux/selectors/jobs'
import { getPostedJobs } from 'Redux/selectors/postedJobs'
import { getUser } from 'Redux/selectors/user'

import { withPuck, withSendRequest, withApplyForAJob } from './index'

const getOmitProps = props =>
  _.omit(props, ['onConnectToChat', '_job', '_postedJobs'])

function withConnectToChat(Component) {
  return class extends React.Component {
    static propTypes = {
      onConnectToChat: PropTypes.func,
      onShowPuck: PropTypes.func,
      getError: PropTypes.func,
      onSendRequest: PropTypes.func,
      onApplyJob: PropTypes.func,
      _job: PropTypes.object,
    }

    state = {
      loadChatUsername: null,
    }

    handleConnectToChat = (profile, config = {}) => {
      const {
        onConnectToChat,
        onShowPuck,
        getError,
        onSendRequest,
        onApplyJob,
        _job,
        _postedJobs,
        user,
        t,
      } = this.props
      const { fromJob } = config

      const companionId = _.isString(profile) ? profile : profile.username

      this.setState({ loadChatUsername: companionId })

      onConnectToChat(companionId, ({ error }) => {
        this.setState({ loadChatUsername: null }, () => {
          if (_.get(error, 'payload.code') === 'ForbiddenChat') {
            const peopleWhoApplied = _.get(_job, 'peopleWhoApplied', [])
            const isAlreadySendRequest = _postedJobs.some(el =>
              el.requests.some(request => request.doer === companionId),
            )

            if (
              fromJob
                ? peopleWhoApplied.some(el => el.userId === user.username)
                : isAlreadySendRequest
            ) {
              onShowPuck({
                type: 'error',
                message: t('apiErrors.chatWaitError'),
              })
            } else {
              onShowPuck({
                type: 'warning',
                message: getError(error),
                callback: () => {
                  setTimeout(() => {
                    if (fromJob && !_.isEmpty(_job)) onApplyJob(_job)
                    else onSendRequest({ profile })
                  }, 200)
                },
              })
            }
          } else if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
            })
          } else navigation.showModal(routes.chat)
        })
      })
    }

    render() {
      const { loadChatUsername } = this.state

      return (
        <Component
          loadChatUsername={loadChatUsername}
          onConnectToChat={this.handleConnectToChat}
          {...getOmitProps(this.props)}
        />
      )
    }
  }
}

const actions = {
  onConnectToChat: connectToChat,
}

const selectors = createStructuredSelector({
  _job: getSpecificJob,
  user: getUser,
  _postedJobs: getPostedJobs,
})

export default compose(
  withApplyForAJob,
  withSendRequest,
  withPuck,
  connect(
    selectors,
    actions,
  ),
  withConnectToChat,
)
