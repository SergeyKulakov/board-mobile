import React from 'react'
import PropTypes from 'prop-types'

import { ScreenHeader, BackIcon, ScreenTitle } from 'Components/UI'

import { Container, StepInfo, Block, styles } from './style'

const Header = ({ title, onGoBack, step, searchProps, ...props }) => (
  <ScreenHeader {...props} searchProps={searchProps}>
    <Container>
      <Block>
        <BackIcon onClick={onGoBack} />
      </Block>
      <Block isRoot>
        <ScreenTitle style={styles.Title}>{title}</ScreenTitle>
      </Block>
      <Block>
        <StepInfo>{step}</StepInfo>
      </Block>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
  searchProps: PropTypes.shape({
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
}

export { Header }
