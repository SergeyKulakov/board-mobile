import React from 'react'
import PropTypes from 'prop-types'

import { colors } from 'Themes'
import { Icon } from '../Icon'

export const HeartIcon = ({ isActive, size = 20, ...props }) => {
  const name = isActive ? 'heart' : 'heart-o'
  const color = isActive ? colors.red : colors.white

  return <Icon {...props} name={name} size={size} color={color} />
}

HeartIcon.propTypes = {
  isActive: PropTypes.bool,
  size: PropTypes.number,
}
