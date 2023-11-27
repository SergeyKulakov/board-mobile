import React from 'react'
import PropTypes from 'prop-types'
import withNamespaces from 'Components/HOC/withNamespaces'

import { ScreenHeader, Hamburger } from 'Components/UI'
import { Container, Title, BackButton } from './style'

const Header = ({ onBackClick, onHamburgerClick, t }) => (
  <ScreenHeader>
    <Container>
      <BackButton onClick={onBackClick} />
      <Hamburger onClick={onHamburgerClick} />
      <Title>{t('common.subscription')}</Title>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  t: PropTypes.func,
  onBackClick: PropTypes.func,
  onHamburgerClick: PropTypes.func,
}

export default withNamespaces(Header)
