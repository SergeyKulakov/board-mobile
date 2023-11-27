import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Container } from './style'

class PhoneModal extends PureComponent {
  state = {}

  componentDidMount() {}

  render() {
    return <Container />
  }
}

PhoneModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default PhoneModal
