import React from 'react'
import PropTypes from 'prop-types'

import { ScreenHeader, BackIcon, ScreenTitle } from 'Components/UI'

import { Left, Middle, Right, styles } from './style'

const Header = ({ onBackClick, t }) => (
  <ScreenHeader>
    <Left>
      <BackIcon onClick={onBackClick} />
    </Left>
    <Middle>
      <ScreenTitle style={styles.Title}>
        {t('profilePage.fields.phoneNumber.label')}
      </ScreenTitle>
    </Middle>
    <Right />
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  t: PropTypes.func,
}

export default Header
