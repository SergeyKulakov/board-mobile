import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'Components/UI'
import _ from 'lodash'

import { hitSlop } from './config'
import { Container, styles } from './style'

const SocialButton = ({ icon, color, onClick }) => (
  <TouchableOpacity
    onPress={onClick}
    hitSlop={hitSlop}
    disabled={!_.isFunction(onClick)}
  >
    <Container bg={color}>
      <Icon {...styles.getIcon(icon)} />
    </Container>
  </TouchableOpacity>
)

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export { SocialButton }
