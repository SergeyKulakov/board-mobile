import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from '../Icon'

import { Container, styles } from './style'

const IconButton = ({
  radius,
  gradientProps,
  loading,
  loaderStyle,
  icon,
  onClick,
  style,
}) => (
  <Container onPress={onClick} style={style}>
    <LinearGradient
      {...styles.getLinearGradientStyle(radius)}
      {...gradientProps}
    >
      {loading ? (
        <ActivityIndicator {...styles.getLoaderStyle(loaderStyle)} />
      ) : (
        <Icon {...icon} />
      )}
    </LinearGradient>
  </Container>
)

IconButton.propTypes = {
  radius: PropTypes.number,
  gradientProps: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    colors: PropTypes.array,
  }),
  icon: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  loaderStyle: PropTypes.shape({
    size: PropTypes.oneOf(['small', 'large']),
    color: PropTypes.string,
  }),
}

export { IconButton }
