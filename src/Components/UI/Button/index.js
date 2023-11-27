import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { colors } from 'Themes'
import { GradientContainer } from '../GradientContainer'

import {
  Text,
  getContainerStyle,
  IconBlock,
  Container,
  ColoredContainer,
  styles,
} from './style'

const Button = ({
  visible,
  linear,
  disabled,
  type,
  textStyle,
  text,
  loading,
  style,
  BeforeIcon,
  AfterIcon,
  onClick,
  onLongPress,
  fieldStyle,
  children,
  gradientStyle,
  onLayout,
}) => {
  if (!visible) return <Fragment />

  const renderIcon = align => (
    <IconBlock align={align} testID="icon">
      {align === 'before' ? BeforeIcon : AfterIcon}
    </IconBlock>
  )

  const renderBody = () => (
    <Container style={style.container} onLayout={onLayout}>
      {loading ? (
        <ActivityIndicator testID="loader" {...styles.ActivityIndicator} />
      ) : (
        <>
          {BeforeIcon && renderIcon('before')}
          <Text
            testID="renderText"
            style={textStyle}
            color={style.color}
            disabled={disabled}
          >
            {children || text}
          </Text>
          {AfterIcon && renderIcon('after')}
        </>
      )}
    </Container>
  )

  const renderContent = () => {
    if (type === 'gradient') {
      return (
        <GradientContainer
          testID="gradientContainer"
          style={{ ...getContainerStyle(linear), ...gradientStyle }}
          gradient={
            disabled ? style.disabledGradient || style.gradient : style.gradient
          }
        >
          {renderBody()}
        </GradientContainer>
      )
    }
    if (type === 'color') {
      return (
        <ColoredContainer
          testID="coloredContainer"
          style={{ ...getContainerStyle(linear) }}
          bgColor={style.bgColor}
        >
          {renderBody()}
        </ColoredContainer>
      )
    }

    return null
  }

  return disabled || loading || !type ? (
    renderContent()
  ) : (
    <TouchableOpacity
      onPress={!disabled && onClick}
      onLongPress={onLongPress}
      style={fieldStyle}
    >
      {renderContent()}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  linear: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  AfterIcon: PropTypes.node,
  BeforeIcon: PropTypes.node,
  text: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  visible: PropTypes.bool,
  textStyle: PropTypes.object,
  onClick: PropTypes.func,
  onLongPress: PropTypes.func,
  fieldStyle: PropTypes.object,
  gradientStyle: PropTypes.object,
  children: PropTypes.string,
  onLayout: PropTypes.func,
}

Button.defaultProps = {
  visible: true,
  type: 'gradient',
  style: {
    color: colors.white,
    bgColor: colors.white,
  },
}

export { Button }
