import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../Icon'

import { Container, CountText, styles } from './style'

const CommentsIcon = ({ value, style, icon, textStyle }) => (
  <Container style={style}>
    <Icon {...styles.CommentsIcon} {...icon} />
    <CountText style={textStyle}>{String(value) || '0'}</CountText>
  </Container>
)

CommentsIcon.propTypes = {
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

export { CommentsIcon }
