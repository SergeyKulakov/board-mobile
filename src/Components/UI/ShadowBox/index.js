import React from 'react'
import PropTypes from 'prop-types'

import { Container, Title } from './style'

const ShadowBox = ({ title, children, style, textStyle }) => (
  <Container style={style}>
    {title && <Title style={textStyle}>{title}</Title>}
    {children}
  </Container>
)

ShadowBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.object,
}

ShadowBox.Title = ({ children, style }) => (
  <Title style={style}>{children}</Title>
)

ShadowBox.Title.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export { ShadowBox }
