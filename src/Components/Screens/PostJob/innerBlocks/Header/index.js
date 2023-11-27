import React from 'react'
import PropTypes from 'prop-types'

import { ScreenHeader, BackIcon, Hamburger, ScreenTitle } from 'Components/UI'
import {
  Container,
  RightWrapper,
  BackIconWrapper,
  Block,
  styles,
} from './style'

const Header = ({ title, onHamburgerClick, onBackClick }) => (
  <ScreenHeader>
    <Container>
      <RightWrapper>
        <BackIconWrapper>
          <BackIcon onClick={onBackClick} />
        </BackIconWrapper>
        <Hamburger onClick={onHamburgerClick} />
      </RightWrapper>
      <Block flex={5}>
        <ScreenTitle style={styles.Title}>{title}</ScreenTitle>
      </Block>
      <Block flex={2} />
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onHamburgerClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
}

export { Header }
