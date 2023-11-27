import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'
import { Modal as RNModal, TouchableWithoutFeedback } from 'react-native'

import { ModalButton } from 'Components/UI'

import { ButtonContainer, Container, Overlay, Content, Title } from './style'

const Modal = ({
  title,
  width,
  visible,
  children,
  onConfirmPress,
  onCancelPress,
  style,
}) => (
  <RNModal
    visible={visible}
    animationType="fade"
    transparent
    onRequestClose={onCancelPress}
    supportedOrientations={['portrait', 'landscape']}
  >
    <TouchableWithoutFeedback onPress={onCancelPress}>
      <Overlay>
        <TouchableWithoutFeedback>
          <Container width={width}>
            <Content style={style} pb={!onConfirmPress && 0} pt={!title && 0}>
              {title && <Title>{title}</Title>}
              {children}
            </Content>
            {onConfirmPress && (
              <ButtonContainer>
                <ModalButton
                  text={getTranslate('sign.submit')}
                  onClick={onConfirmPress}
                />
              </ButtonContainer>
            )}
          </Container>
        </TouchableWithoutFeedback>
      </Overlay>
    </TouchableWithoutFeedback>
  </RNModal>
)

Modal.propTypes = {
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onConfirmPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  style: PropTypes.object,
}

Modal.defaultProps = {
  width: 300,
}

export { Modal }
