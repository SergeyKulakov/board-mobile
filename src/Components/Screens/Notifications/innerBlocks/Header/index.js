import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, Hamburger } from 'Components/UI'

import { Container, BackButton, Title } from './style'

const Header = ({ onBackClick, onHamburgerClick }) => (
  <ScreenHeader>
    <Container>
      <BackButton onClick={onBackClick} />
      <Hamburger onClick={onHamburgerClick} />
      <Title>{getTranslate('notifications.notifications')}</Title>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  onHamburgerClick: PropTypes.func,
}

export { Header }
