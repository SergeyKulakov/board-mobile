import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import _ from 'lodash'

import { FlagIcon } from 'Components/UI'
import { TouchableOpacity } from 'react-native'

import { Container, InfoText } from './style'

const LanguageButton = ({ onClick, flagName }) => (
  <TouchableOpacity
    testID="flagButton"
    onPress={onClick}
    disabled={!_.isFunction(onClick)}
  >
    <Container>
      <InfoText>{i18n.locale.slice(0, 2).toUpperCase()}</InfoText>
      <FlagIcon fileName={flagName} />
    </Container>
  </TouchableOpacity>
)

LanguageButton.propTypes = {
  onClick: PropTypes.func,
  flagName: PropTypes.string.isRequired,
}

export { LanguageButton }
