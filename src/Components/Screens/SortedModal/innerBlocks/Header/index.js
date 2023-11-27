import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'

import { ScreenHeader, BackIcon, ScreenTitle } from 'Components/UI'

import { Left, Right, Middle, styles } from './style'

const Header = ({ onClickBack }) => (
  <ScreenHeader>
    <Left>
      <BackIcon onClick={onClickBack} />
    </Left>
    <Middle>
      <ScreenTitle style={styles.Title}>
        {i18n.t('findJobPage.sorting')}
      </ScreenTitle>
    </Middle>
    <Right />
  </ScreenHeader>
)

Header.propTypes = {
  onClickBack: PropTypes.func,
}

export { Header }
