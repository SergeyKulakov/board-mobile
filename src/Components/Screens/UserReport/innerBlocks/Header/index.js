import React from 'react'
import PropTypes from 'prop-types'

import { withNamespaces } from 'Components/HOC'

import { ScreenHeader, BackIcon } from 'Components/UI'

import { Container, Left, Middle, Title } from './style'

const Header = ({ onBackClick, t }) => (
  <ScreenHeader>
    <Container>
      <Left>
        <BackIcon onClick={onBackClick} />
      </Left>
      <Middle>
        <Title>{t('serviceProvider.report')}</Title>
      </Middle>
      <Left />
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  t: PropTypes.func,
}

export default withNamespaces(Header)
