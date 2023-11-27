import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, Hamburger } from 'Components/UI'
import { Container, Title, BackButton } from './style'

const Header = ({ searchProps, onBackClick, onHamburgerClick }) => (
  <ScreenHeader searchProps={searchProps}>
    <Container>
      <BackButton onClick={onBackClick} />
      <Hamburger onClick={onHamburgerClick} />
      <Title>{getTranslate('homePage.chats')}</Title>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  searchProps: PropTypes.shape({
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
}

export { Header }
