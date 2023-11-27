import React from 'react'
import PropTypes from 'prop-types'

import { Container, Text } from './style'

const EmptyList = ({ children, t }) => (
  <Container>
    <Text>{children || t('common.emptyList')}</Text>
  </Container>
)

EmptyList.propTypes = {
  children: PropTypes.string,
  t: PropTypes.func,
}

export default EmptyList
