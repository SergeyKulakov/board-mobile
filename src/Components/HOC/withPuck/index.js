import React from 'react'
import _ from 'lodash'
import { puckSuccess, puckError, puchWarning } from 'Assets/images/Pucks'
import { TouchableWithoutFeedback } from 'react-native'

import { compose } from 'redux'
import withNamespaces from '../withNamespaces'

import {
  Container,
  Image,
  ImageWrapper,
  Message,
  MessageWrapper,
  ButtonsWrapper,
  SubmitButton,
  ButtonText,
} from './style'

const initialState = {
  isShow: false,
  message: '',
  image: puckSuccess,
  text: {},
  onSubmit: null,
  callback: null,
}

function withPuck(Component) {
  return class extends React.Component {
    state = {
      ...initialState,
    }

    callCallback = delay => {
      const { onSubmit, callback } = this.state

      if (!_.isFunction(onSubmit)) {
        setTimeout(() => {
          this.setState({ ...initialState }, () => {
            setTimeout(() => {
              if (_.isFunction(callback)) callback()
            }, 100)
          })
        }, delay)
      }
    }

    showSuccess = (message, delay = 1500) => {
      this.setState({ isShow: true, message, image: puckSuccess }, () => {
        this.callCallback(delay)
      })
    }

    showError = (message, delay = 4000) => {
      this.setState({ isShow: true, message, image: puckError }, () => {
        this.callCallback(delay)
      })
    }

    showWarning = (message, delay = 3000) => {
      this.setState({ isShow: true, message, image: puchWarning }, () => {
        this.callCallback(delay)
      })
    }

    handleShowPuck = (props = {}) => {
      const {
        type = 'success',
        message = '',
        delay,
        callback,
        onSubmit,
        text = {},
      } = props

      this.setState({ onSubmit, text, callback }, () => {
        if (type === 'error' && _.isFunction(this.showError)) {
          this.showError(message, delay, callback)
        } else if (type === 'success' && _.isFunction(this.showSuccess)) {
          this.showSuccess(message, delay, callback)
        } else if (type === 'warning' && _.isFunction(this.showWarning)) {
          this.showWarning(message, delay, callback)
        }
      })
    }

    handleSubmitClick = () => {
      const { onSubmit } = this.state

      onSubmit()
      this.setState({ ...initialState })
    }

    handleCancelClick = () => {
      const { callback } = this.state

      this.setState({ ...initialState }, callback)
    }

    render() {
      const { t } = this.props
      const { isShow, message, image, onSubmit, text } = this.state

      return (
        <>
          <Component
            {...this.props}
            onShowPuck={this.handleShowPuck}
            isShowPack={isShow}
          />
          {isShow ? (
            <TouchableWithoutFeedback
              onPress={this.handleCancelClick}
              disabled={!isShow}
            >
              <Container>
                <ImageWrapper>
                  <Image image={image} />
                </ImageWrapper>
                {message ? (
                  <MessageWrapper>
                    <Message>{message}</Message>
                  </MessageWrapper>
                ) : null}
                {_.isFunction(onSubmit) ? (
                  <ButtonsWrapper>
                    <SubmitButton onPress={this.handleSubmitClick}>
                      <ButtonText>{text.submit || t('sign.submit')}</ButtonText>
                    </SubmitButton>
                  </ButtonsWrapper>
                ) : null}
              </Container>
            </TouchableWithoutFeedback>
          ) : null}
        </>
      )
    }
  }
}

export default compose(
  withNamespaces,
  withPuck,
)
