import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'Components/HOC'

import { ScreenHeader, Hamburger } from 'Components/UI'

import { Block, Title, BackIcon, Middle, Container } from './style'

const Header = ({ onBackClick, onHamburgerClick, t }) => (
  <ScreenHeader>
    <Container>
      <Block>
        <BackIcon testID="backIcon" onClick={onBackClick} />
        <Hamburger onClick={onHamburgerClick} />
      </Block>
      <Middle>
        <Title>{t('rating.reviewRating')}</Title>
      </Middle>
      <Block />
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  t: PropTypes.func,
}

export default withNamespaces(Header)
