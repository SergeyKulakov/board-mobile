import React from 'react'
import PropTypes from 'prop-types'

import { UploadImages } from 'Components/Blocks'

import { WrapperTitle } from '../WrapperTitle'
import { Container } from './style'

const Picks = ({
  title,
  data,
  toast,
  onAddImage,
  onDeleteImage,
  onClickImage,
}) => (
  <Container>
    <WrapperTitle>{title}</WrapperTitle>
    <UploadImages
      data={data}
      toast={toast}
      onAdd={onAddImage}
      onDelete={onDeleteImage}
      jobImagesMode
      onClickImage={onClickImage}
    />
  </Container>
)

Picks.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  toast: PropTypes.func.isRequired,
  onAddImage: PropTypes.func,
  onDeleteImage: PropTypes.func,
  onClickImage: PropTypes.func,
}

export { Picks }
