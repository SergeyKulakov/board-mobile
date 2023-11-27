import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, BackIcon } from 'Components/UI'

import { Container, Left, Middle, Title } from './style'

const Header = ({ onBackClick }) => {
  return (
    <ScreenHeader>
      <Container>
        <Left>
          <BackIcon testID="backButton" onClick={onBackClick} />
        </Left>
        <Middle>
          <Title>{getTranslate('LeftoverOnes.reasonCancelling')}</Title>
        </Middle>
        <Left />
      </Container>
    </ScreenHeader>
  )
}

Header.propTypes = {
  onBackClick: PropTypes.func,
}

export { Header }
