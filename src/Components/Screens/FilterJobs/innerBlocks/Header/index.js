import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { ScreenHeader, BackIcon, ScreenTitle } from 'Components/UI'

import { hitSlop } from './config'
import {
  Container,
  ClearButton,
  BackIconWrapper,
  Left,
  Middle,
  Right,
  styles,
} from './style'

const Header = ({ text, onBackClick, onClearClick }) => (
  <ScreenHeader>
    <Container>
      <Left>
        <BackIconWrapper>
          <BackIcon onClick={onBackClick} />
        </BackIconWrapper>
      </Left>
      <Middle>
        <ScreenTitle style={styles.Title}>{text.title}</ScreenTitle>
      </Middle>
      <Right>
        <TouchableOpacity hitSlop={hitSlop} onPress={onClearClick}>
          <ClearButton>{text.clearText}</ClearButton>
        </TouchableOpacity>
      </Right>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  text: PropTypes.object.isRequired,
  onBackClick: PropTypes.func,
  onClearClick: PropTypes.func,
}

export { Header }
