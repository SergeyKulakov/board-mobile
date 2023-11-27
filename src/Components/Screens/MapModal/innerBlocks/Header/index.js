import React from 'react'
import PropTypes from 'prop-types'

import { ScreenHeader, BackIcon } from 'Components/UI'

import { Container, Left, Middle, Title } from './style'

const Header = ({ title, onBackClick }) => {
  return (
    <ScreenHeader>
      <Container>
        <Left>
          <BackIcon testID="backButton" onClick={onBackClick} />
        </Left>
        <Middle>
          <Title>{title}</Title>
        </Middle>
        <Left />
      </Container>
    </ScreenHeader>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  onBackClick: PropTypes.func,
}

export default Header
