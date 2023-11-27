import React from 'react'
import PropTypes from 'prop-types'

import { Modal, InputBlock } from 'Components/UI'

import { Container } from './style'

const InputModal = ({
  title,
  modalWidth,
  visible,
  onSubmit,
  onCancel,
  ...props
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      width={modalWidth}
      onConfirmPress={onSubmit}
      onCancelPress={onCancel}
    >
      <Container>
        <InputBlock {...props} />
      </Container>
    </Modal>
  )
}

InputModal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  value: PropTypes.string,
  modalWidth: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export { InputModal }
