import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'Components/UI'
import { Header } from './innerBlocks'
import { Container, Content, Textarea } from './style'

class CancelJobModal extends PureComponent {
  state = {
    reason: '',
  }

  handleChange = reason => this.setState({ reason })

  handleSubmit = () => {
    const { navigate, onSubmit } = this.props
    const { reason } = this.state

    onSubmit(reason)
    navigate.hideModal()
  }

  render() {
    const { navigate, t } = this.props
    const { reason } = this.state

    return (
      <Container>
        <Header onBackClick={navigate.hideModal} />
        <Content>
          <Textarea value={reason} onChangeText={this.handleChange} />
        </Content>
        <Button
          text={t('LeftoverOnes.cancelJob')}
          linear
          onClick={this.handleSubmit}
        />
      </Container>
    )
  }
}

CancelJobModal.propTypes = {
  navigate: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
}

export default CancelJobModal
