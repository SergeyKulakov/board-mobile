import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { Icon } from '../Icon'

import { Container, ActionButton, ActionContent, styles } from './style'

const RemoveCardAction = () => (
  <Container>
    <LinearGradient {...styles.LinearGradient.container}>
      <ActionContent>
        <ActionButton>
          <Icon {...styles.RemoveIcon} />
        </ActionButton>
      </ActionContent>
    </LinearGradient>
  </Container>
)

RemoveCardAction.propTypes = {}

export { RemoveCardAction }
