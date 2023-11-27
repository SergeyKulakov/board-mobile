import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../Icon'

import { getDistanceShortUnits } from './config'
import { Container, CountText, styles } from './style'

const DistanceIcon = ({ value, units, style, icon, textStyle }) => (
  <Container style={style}>
    <Icon {...styles.DistanceIcon} {...icon} />
    <CountText style={textStyle}>
      {value.toFixed(1)} {getDistanceShortUnits(units)}
    </CountText>
  </Container>
)

DistanceIcon.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.object,
  icon: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
}

export { DistanceIcon }
