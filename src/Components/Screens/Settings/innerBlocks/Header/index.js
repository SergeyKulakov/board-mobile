import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, Hamburger } from 'Components/UI'
import { Container, Title, BackButton } from './style'

const Header = ({ onBackClick, onHamburgerClick }) => (
  <ScreenHeader>
    <Container>
      <BackButton onClick={onBackClick} />
      <Hamburger onClick={onHamburgerClick} />
      <Title>{getTranslate('homePage.settings')}</Title>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  onHamburgerClick: PropTypes.func,
}

export { Header }
