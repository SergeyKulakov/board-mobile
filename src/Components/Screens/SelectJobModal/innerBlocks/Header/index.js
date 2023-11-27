import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, BackIcon } from 'Components/UI'
import { Container, Title, Middle, Left } from './style'

const Header = ({ onBackClick, searchProps }) => (
  <ScreenHeader searchProps={searchProps}>
    <Container>
      <Left>
        <BackIcon onClick={onBackClick} />
      </Left>
      <Middle>
        <Title>{getTranslate('LeftoverOnes.selectJob')}</Title>
      </Middle>
      <Left />
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  onBackClick: PropTypes.func,
  searchProps: PropTypes.shape({
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSubmit: PropTypes.func,
  }),
}

export { Header }
