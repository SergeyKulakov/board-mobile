import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'Components/UI'

import { Container, styles } from './style'

class ButtonsGroup extends PureComponent {
  state = {
    height: 100,
  }

  handleSetButtonHeight = node => {
    const { height } = node.nativeEvent.layout

    this.setState({ height })
  }

  render() {
    const {
      submitText,
      cancelText,
      style,
      onSubmit,
      onCancel,
      withHeight,
      isSubmitLoading,
      isCancelLoading,
    } = this.props
    const { height } = this.state
    return (
      <Container style={style} wrapperHeight={withHeight ? height : undefined}>
        <Button
          {...styles.CancelButton}
          loading={isCancelLoading}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          {...styles.SubmitButton}
          loading={isSubmitLoading}
          onLayout={this.handleSetButtonHeight}
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </Container>
    )
  }
}

ButtonsGroup.propTypes = {
  submitStyle: PropTypes.object,
  cancelStyle: PropTypes.object,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  withHeight: PropTypes.bool,
  isSubmitLoading: PropTypes.bool,
  isCancelLoading: PropTypes.bool,
}

ButtonsGroup.defaultProps = {
  submitStyle: {},
  cancelStyle: {},
}

export default ButtonsGroup
