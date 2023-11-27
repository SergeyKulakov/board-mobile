import React from 'react'
import PropTypes from 'prop-types'

import { LinkPreview } from 'Components/Blocks'
import { WrapperTitle } from '../WrapperTitle'
import { Container } from './style'

const VideoLinks = ({ title, data, toast, onAdd, onDelete }) => (
  <Container>
    <WrapperTitle>{title}</WrapperTitle>
    <LinkPreview
      inputType="video"
      title={title}
      data={data}
      toast={toast}
      onAdd={onAdd}
      onDelete={onDelete}
    />
  </Container>
)

VideoLinks.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
}

export { VideoLinks }
