import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { getNavigationIconStyle } from 'Helpers/icons'

import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'Components/UI'

import { Container, Text, styles } from './style'

const Link = ({ isActive, disabled, icon, text, onClick }) => {
  const renderContent = () => (
    <Container disabled={disabled}>
      <Icon {...getNavigationIconStyle(icon)} />
      <Text>{text}</Text>
    </Container>
  )

  if (isActive) {
    return (
      <LinearGradient colors={styles.GradientContainer.gradient}>
        {renderContent()}
      </LinearGradient>
    )
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      {renderContent()}
    </TouchableOpacity>
  )
}

Link.propTypes = {
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export { Link }
