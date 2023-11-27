import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { hitSlop } from 'Constants/hitSlop'

import { TouchableWithoutFeedback } from 'react-native'

import { Text, PlusButton } from './style'

class MoreText extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShowAllText: false,
    }

    this.isLongText = (props.children || '').split(' ').length > 30
  }

  handleShowAllText = () => this.setState({ isShowAllText: true })

  render() {
    const { children, style } = this.props
    const { isShowAllText } = this.state

    const text =
      !isShowAllText && this.isLongText
        ? `${children
            .split(' ')
            .slice(0, 30)
            .join(' ')}...`
        : children

    return (
      <Text style={style}>
        {text}
        {isShowAllText || !this.isLongText ? null : (
          <TouchableWithoutFeedback
            onPress={this.handleShowAllText}
            hitSlop={hitSlop}
          >
            <PlusButton>[+]</PlusButton>
          </TouchableWithoutFeedback>
        )}
      </Text>
    )
  }
}

MoreText.propTypes = {
  children: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export { MoreText }
