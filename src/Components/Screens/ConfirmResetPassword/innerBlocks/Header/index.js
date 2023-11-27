import React from 'react'
import PropTypes from 'prop-types'

import { ScreenHeader, BackIcon } from 'Components/UI'
import { Container, Block, Middle, Title, styles } from './style'

const Header = ({ title, onBackClick }) => (
  <ScreenHeader>
    <Container>
      <Block>
        <BackIcon testID="backButton" onClick={onBackClick} />
      </Block>
      <Middle>
        <Title style={styles.Title}>{title}</Title>
      </Middle>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  title: PropTypes.string,
  onBackClick: PropTypes.func,
}

export { Header }
