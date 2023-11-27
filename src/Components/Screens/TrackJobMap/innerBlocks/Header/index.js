import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, BackIcon } from 'Components/UI'

import {
  Container,
  Middle,
  LeftButtonsWrapper,
  BackIconWrapper,
  Title,
} from './style'

const Header = ({ onBackClick }) => (
  <ScreenHeader>
    <Container>
      <LeftButtonsWrapper>
        <BackIconWrapper>
          <BackIcon onClick={onBackClick} />
        </BackIconWrapper>
      </LeftButtonsWrapper>
      <Middle>
        <Title>{getTranslate('jobTrack.trackServiceProvider')}</Title>
      </Middle>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func.isRequired,
}

export { Header }
