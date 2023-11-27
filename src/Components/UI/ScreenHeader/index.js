import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { GradientContainer } from '../GradientContainer'
import { InputSearch } from '../InputSearch'
import { Icon } from '../Icon'

import { hitSlop } from './config'
import {
  Header,
  Container,
  SearchContainer,
  Title,
  HumburgerContainer,
  HumburgerLine,
  styles,
} from './style'

const ScreenHeader = ({ style, children, searchProps }) => (
  <GradientContainer style={style.container}>
    <Container>
      <Header>{children}</Header>
      {searchProps && (
        <SearchContainer>
          <InputSearch {...searchProps} />
        </SearchContainer>
      )}
    </Container>
  </GradientContainer>
)

ScreenHeader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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

ScreenHeader.defaultProps = {
  style: {
    container: {},
  },
}

const BackIcon = props => <Icon {...styles.Icon} {...props} />

BackIcon.propTypes = {
  onClick: PropTypes.func,
}

const ScreenTitle = ({ children, style }) => (
  <Title style={style}>{children}</Title>
)

ScreenTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

const Hamburger = ({ onClick }) => (
  <TouchableOpacity hitSlop={hitSlop.hamburger} onPress={onClick}>
    <HumburgerContainer>
      <HumburgerLine width="80%" />
      <HumburgerLine width="100%" />
      <HumburgerLine width="70%" />
    </HumburgerContainer>
  </TouchableOpacity>
)

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export { ScreenHeader, BackIcon, ScreenTitle, Hamburger }
