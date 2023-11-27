import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getCountryFlagByPhoneNumber } from 'Constants/phones'
import { colors } from 'Themes'

import { Animated, Easing } from 'react-native'
import { FlagIcon } from '../FlagIcon'
import { Icon } from '../Icon'

import {
  Container,
  Label,
  Input,
  AnimateLabel,
  InputContainer,
  ErrorMessageBlock,
  FlagIconContainer,
  styles,
} from './style'

class InputBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowSecure: !props.isSecure,
      isActive: false,
      inputHeight: 40,
    }

    this.input = React.createRef()
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    const { value } = this.props

    if (value) {
      this.animate(1)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props
    if (!prevProps.value && value && !prevState.isActive) {
      this.animate(1)
    }

    if (prevProps.value && !value && !prevState.isActive) {
      this.animate(0)
    }
  }

  handleChangeContentSize = ({
    nativeEvent: {
      contentSize: { height },
    },
  }) => {
    const { autoHeight } = this.props

    if (autoHeight) this.setState({ inputHeight: height })
  }

  handleSetFocus = () => {
    const { animatedLine, animatedLabel, value, onFocus } = this.props

    if (animatedLabel || animatedLine) {
      this.setState({ isActive: true })
      if (!value) {
        this.animate(1)
      }
    }

    if (onFocus) onFocus()
  }

  handleBlur = props => {
    const {
      onBlur,
      animatedLine,
      animatedLabel,
      value,
      onSetTouched,
    } = this.props

    if (animatedLine || animatedLabel) {
      this.setState({ isActive: false })
      if (!value) {
        this.animate(0)
      }
    }

    if (onBlur) onBlur(props)

    if (onSetTouched) onSetTouched()
  }

  toggleShowSecureText = () =>
    this.setState(prevState => ({ isShowSecure: !prevState.isShowSecure }))

  animate = toValue => {
    Animated.timing(this.animatedValue, {
      toValue,
      duration: 200,
      easing: Easing.linear,
    }).start()
  }

  renderLabel = () => {
    const { animatedLabel, label } = this.props
    const { isActive } = this.state

    if (animatedLabel) {
      const inputRange = [0, 0.5, 1]

      const animateStyle = {
        fontSize: this.animatedValue.interpolate({
          inputRange,
          outputRange: [20, 18, 16],
        }),
        top: this.animatedValue.interpolate({
          inputRange,
          outputRange: [10, -5, -20],
        }),
        color: this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.disabledGray, colors.textGray],
        }),
      }

      return (
        <AnimateLabel
          style={animateStyle}
          isActive={isActive}
          testID="label"
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {label}
        </AnimateLabel>
      )
    }

    return <Label>{label}</Label>
  }

  render() {
    const {
      label,
      animatedLine,
      animatedLabel,
      disabled,
      value,
      numberMode,
      placeholder,
      isSecure,
      onChange,
      onEndEditing,
      errorMessage,
      errorStatus,
      onOpenPhoneModal,
      ...props
    } = this.props

    const { isActive, isShowSecure, inputHeight } = this.state

    return (
      <Container>
        {label && this.renderLabel()}
        <InputContainer
          isActive={animatedLine && isActive}
          isError={errorStatus || errorMessage}
          height={inputHeight}
        >
          {_.isFunction(onOpenPhoneModal) ? (
            <FlagIconContainer
              testID="FlagIconContainer"
              onPress={() => onOpenPhoneModal()}
            >
              <FlagIcon fileName={getCountryFlagByPhoneNumber(value)} />
            </FlagIconContainer>
          ) : null}
          <Input
            {...props}
            ref={this.input}
            testID="input"
            editable={!disabled}
            value={value}
            keyboardType={
              numberMode || _.isFunction(onOpenPhoneModal)
                ? 'numeric'
                : 'default'
            }
            onChangeText={onChange}
            placeholder={animatedLabel ? null : placeholder}
            secureTextEntry={isSecure && !isShowSecure}
            onBlur={this.handleBlur}
            onFocus={this.handleSetFocus}
            onSubmitEditing={onEndEditing}
            autoCapitalize="none"
            onContentSizeChange={this.handleChangeContentSize}
            style={{ height: inputHeight }}
          />
          {isSecure && (
            <Icon
              testID="secureIcon"
              {...styles.getIcon(isShowSecure)}
              onClick={this.toggleShowSecureText}
            />
          )}
        </InputContainer>
        {errorMessage && (
          <ErrorMessageBlock testID="errorMessage">
            {errorMessage}
          </ErrorMessageBlock>
        )}
      </Container>
    )
  }
}

InputBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  numberMode: PropTypes.bool,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  errorStatus: PropTypes.bool,
  disabled: PropTypes.bool,
  autoHeight: PropTypes.bool,
  placeholder: PropTypes.string,
  animatedLabel: PropTypes.bool,
  animatedLine: PropTypes.bool,
  isSecure: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
  onSetTouched: PropTypes.func,
  onOpenPhoneModal: PropTypes.func,
  multiline: PropTypes.bool,
}

export { InputBlock }
