import React from 'react'
import PropTypes from 'prop-types'

import { LanguageButton } from 'Components/Blocks'
import { ScreenHeader, Icon, ScreenTitle } from 'Components/UI'

import { Container, Block, LanguageButtonContainer, Left, styles } from './style'

const Header = ({ onGoBack, onClickLanguageButton, getCurrentLanguage, t }) => (
  <ScreenHeader>
    <Container>
      <Left>
        <Icon {...styles.Icon} onClick={onGoBack} />
      </Left>
      <Block flex={5}>
        <ScreenTitle style={styles.Title}>{t('profilePage.title')}</ScreenTitle>
      </Block>
      <Block>
        <LanguageButtonContainer>
          <LanguageButton
            flagName={getCurrentLanguage('flag')}
            onClick={onClickLanguageButton}
          />
        </LanguageButtonContainer>
      </Block>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onGoBack: PropTypes.func,
  onClickLanguageButton: PropTypes.func,
  t: PropTypes.func,
  getCurrentLanguage: PropTypes.func,
}

export default Header
