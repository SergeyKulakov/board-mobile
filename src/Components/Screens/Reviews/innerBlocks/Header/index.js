import React from 'react'
import PropTypes from 'prop-types'

import { withNamespaces } from 'Components/HOC'

import { ScreenHeader, BackIcon, Hamburger, ScreenTitle } from 'Components/UI'
import {
  Container,
  RightWrapper,
  BackIconWrapper,
  Block,
  styles,
} from './style'

const Header = ({ onHamburgerClick, onBackClick, t }) => (
  <ScreenHeader>
    <Container>
      <RightWrapper>
        <BackIconWrapper>
          <BackIcon onClick={onBackClick} />
        </BackIconWrapper>
        <Hamburger onClick={onHamburgerClick} />
      </RightWrapper>
      <Block flex={5}>
        <ScreenTitle style={styles.Title}>
          {t('rating.reviewRating')}
        </ScreenTitle>
      </Block>
      <Block flex={2} />
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onHamburgerClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  t: PropTypes.func,
}

export default withNamespaces(Header)
