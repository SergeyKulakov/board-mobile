import React from 'react'
import PropTypes from 'prop-types'

import { Container, Icon } from './style'

const ProIcon = ({ isVisible }) =>
  isVisible ? (
    <Container>
      <Icon />
    </Container>
  ) : null

ProIcon.propTypes = {
  isVisible: PropTypes.bool,
}

export { ProIcon }
