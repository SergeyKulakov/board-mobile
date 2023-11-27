import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import i18n from 'I18N'

import { Container, Text } from './style'

const Footer = ({ onSignUpClick }) => {
  const firstWorld = i18n
    .t('sign.dontHaveAccount?')
    .split(' ')
    .slice(0, 1)
    .join()

  return (
    <Container>
      <Text>
        {firstWorld[0].toUpperCase()}
        {firstWorld.slice(1)}{' '}
        {i18n
          .t('sign.dontHaveAccount?')
          .split(' ')
          .slice(1)
          .join(' ')}
      </Text>
      <TouchableOpacity testID="signUp" onPress={onSignUpClick}>
        <Text lastChild link>
          {i18n.t('sign.SignUp')}
        </Text>
      </TouchableOpacity>
    </Container>
  )
}

Footer.propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
}

export { Footer }
