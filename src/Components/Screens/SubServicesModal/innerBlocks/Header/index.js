import React from 'react'
import PropTypes from 'prop-types'

import { withNamespaces } from 'Components/HOC'

import { ScreenHeader, BackIcon, ScreenTitle } from 'Components/UI'
import { Block, styles } from './style'

const Header = ({ onBackClick, t }) => (
  <ScreenHeader>
    <Block>
      <BackIcon onClick={onBackClick} />
    </Block>
    <Block flex={5}>
      <ScreenTitle style={styles.Title}>{t('landingPage.filter')}</ScreenTitle>
    </Block>
    <Block />
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  t: PropTypes.func,
}

export default withNamespaces(Header)
