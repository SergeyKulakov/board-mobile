import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'Components/UI'

import { ActivityIndicator } from 'react-native'

import { getText } from './config'
import {
  Container,
  Title,
  ButtonBlock,
  LoaderContainer,
  TitleWrapper,
  styles,
} from './style'

const ApplyJobModal = ({
  visible,
  onCancel,
  onSubmit,
  loading,
  text: propText,
}) => {
  const text = propText || getText()

  return (
    <Modal onCancelPress={onCancel} visible={visible}>
      <Container>
        <TitleWrapper>
          <Title>{text.title}</Title>
        </TitleWrapper>
        {loading ? (
          <LoaderContainer>
            <ActivityIndicator {...styles.Loader} />
          </LoaderContainer>
        ) : (
          <ButtonBlock>
            <Button {...styles.SkipButton} onClick={onCancel}>
              {text.skip}
            </Button>
            <Button {...styles.ApplyButton} onClick={onSubmit}>
              {text.apply}
            </Button>
          </ButtonBlock>
        )}
      </Container>
    </Modal>
  )
}

ApplyJobModal.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    apply: PropTypes.string,
    skip: PropTypes.string,
  }),
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export { ApplyJobModal }
