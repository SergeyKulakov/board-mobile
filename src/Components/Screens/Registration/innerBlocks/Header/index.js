import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { LanguageButton } from 'Components/Blocks'
import { ScreenHeader, BackIcon, ScreenTitle } from 'Components/UI'

import { Container, Block, styles } from './style'

const Header = ({
  flagName,
  isHideButton,
  onArrowClick,
  onClickLanguageButton,
}) => (
  <ScreenHeader>
    <Container>
      <Block>{!isHideButton && <BackIcon onClick={onArrowClick} />}</Block>
      <Block flex={4}>
        <ScreenTitle style={styles.Title}>
          {getTranslate('sign.SignUp')}
        </ScreenTitle>
      </Block>
      <Block>
        <LanguageButton flagName={flagName} onClick={onClickLanguageButton} />
      </Block>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  isHideButton: PropTypes.bool,
  onArrowClick: PropTypes.func.isRequired,
  flagName: PropTypes.string.isRequired,
  onClickLanguageButton: PropTypes.func.isRequired,
}

export { Header }
