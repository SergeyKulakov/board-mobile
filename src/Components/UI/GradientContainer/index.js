import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from 'Themes'

const GradientContainer = ({ children, style, gradient }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
      colors={[gradient.start, gradient.end]}
    >
      {children}
    </LinearGradient>
  )
}

GradientContainer.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  gradient: PropTypes.object,
}

GradientContainer.defaultProps = {
  style: {
    flex: 1,
  },
  gradient: {
    start: colors.gradientStart,
    end: colors.gradientEnd,
  },
}

export { GradientContainer }
