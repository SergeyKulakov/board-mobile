import React from 'react'
import PropTypes from 'prop-types'

import { Container, Text } from './style'

const EmptyScreen = ({ t }) => (
  <Container>
    <Text>{t('common.emptyList')}</Text>
  </Container>
)

EmptyScreen.propTypes = {
  t: PropTypes.func,
}

export default EmptyScreen
