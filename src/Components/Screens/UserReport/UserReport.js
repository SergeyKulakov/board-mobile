import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'Components/UI'
import { Header } from './innerBlocks'
import { Container, Content, Textarea } from './style'

class UserReport extends PureComponent {
  state = {
    isRequest: false,
    reason: '',
  }

  handleChange = reason => this.setState({ reason })

  handleSubmit = () => {
    const { navigate, onSubmit, userId, onShowPuck, getError, t } = this.props
    const { reason } = this.state

    if (!reason.trim()) {
      onShowPuck({
        type: 'warning',
        message: t('jobDetail.reportMessageRequire'),
      })
      return
    }

    this.setState({ isRequest: true })

    const request = {
      userId,
      message: reason,
    }

    onSubmit(request, ({ error }) => {
      if (error) {
        onShowPuck({
          type: 'error',
          message: getError(error),
        })
      } else
        onShowPuck({
          callback: () => {
            this.setState({ isRequest: true }, navigate.hideModal)
          },
        })
    })
  }

  render() {
    const { navigate, t } = this.props
    const { reason, isRequest } = this.state

    return (
      <Container>
        <Header onBackClick={navigate.hideModal} />
        <Content>
          <Textarea value={reason} onChangeText={this.handleChange} />
        </Content>
        <Button linear onClick={this.handleSubmit} loading={isRequest}>
          {t('sign.submit')}
        </Button>
      </Container>
    )
  }
}

UserReport.propTypes = {
  navigate: PropTypes.object,
  onSubmit: PropTypes.func,
  userId: PropTypes.string,
  t: PropTypes.func,
  onSuccess: PropTypes.func,
  onShowPuck: PropTypes.func,
  getError: PropTypes.func,
}

export default UserReport
