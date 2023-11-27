import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, Block, Line, Text } from './style'

const TabNavigationElement = ({
  isLoading,
  isActive,
  title,
  onClick,
  children,
  style,
}) => (
  <Block style={style} onPress={onClick}>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <Text active={isActive}>{children || title}</Text>
    )}
    <Line active={isActive} />
  </Block>
)

TabNavigationElement.propTypes = {
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export { TabNavigationElement }
