import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { getNavigationIconStyle } from 'Helpers/icons'

import { GradientContainer, Icon } from 'Components/UI'

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
      <GradientContainer
        style={styles.GradientContainer.style}
        gradient={styles.GradientContainer.gradient}
      >
        {renderContent()}
      </GradientContainer>
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
