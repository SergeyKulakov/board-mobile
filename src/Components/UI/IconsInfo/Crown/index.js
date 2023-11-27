import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from './style'

const CrownIcon = ({ style, isVisible }) =>
  isVisible ? <Icon {...style} /> : null

CrownIcon.propTypes = {
  style: PropTypes.any,
  isVisible: PropTypes.bool,
}

export { CrownIcon }
