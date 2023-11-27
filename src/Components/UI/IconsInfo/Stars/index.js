import React from 'react'
import PropTypes from 'prop-types'

import { Container, CountText, Icon } from './style'

const StarsIcon = ({ value, children, style, icon, textStyle, disabled }) => (
  <Container style={style}>
    <Icon {...icon} disabled={disabled} />
    <CountText style={textStyle} disabled={disabled}>
      {value || children || 0}
    </CountText>
  </Container>
)

StarsIcon.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.object,
  icon: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
}

export { StarsIcon }
