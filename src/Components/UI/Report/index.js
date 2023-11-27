import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'
import { TouchableWithoutFeedback } from 'react-native'

import { Container, Icon, Text } from './style'

const Report = ({ children, onClick }) => (
  <TouchableWithoutFeedback onPress={onClick}>
    <Container>
      <Icon />
      <Text>
        {getTranslate('common.report')} {children}
      </Text>
    </Container>
  </TouchableWithoutFeedback>
)

Report.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
}

export { Report }
