import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'Components/UI'

import { Container, Title, ImageWrapper } from './style'

const SmallService = ({ image, title, onClick, style }) => (
  <Container onPress={onClick} style={style}>
    <ImageWrapper>
      <Image data={image} withLoading />
    </ImageWrapper>
    <Title>{title}</Title>
  </Container>
)

SmallService.propTypes = {
  image: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export { SmallService }
