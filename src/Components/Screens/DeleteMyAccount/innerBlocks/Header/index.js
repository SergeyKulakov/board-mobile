import React from 'react'
import PropTypes from 'prop-types'

import withNamespaces from 'Components/HOC/withNamespaces'

import { ScreenHeader } from 'Components/UI'
import { Container, Title, BackButton } from './style'

const Header = ({ onBackClick, t }) => (
  <ScreenHeader>
    <Container>
      <BackButton onClick={onBackClick} />
      <Title>{t('deleteAccountScreen.deleteMyAccount')}</Title>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  t: PropTypes.func,
}

export default withNamespaces(Header)
