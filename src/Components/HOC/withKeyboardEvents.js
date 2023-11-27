import React from 'react'

import { Keyboard, Dimensions } from 'react-native'
import _ from 'lodash'

export default function(Component) {
  return class extends React.Component {
    state = {
      visible: false,
      height: null,
    }

    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      )
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      )
    }

    componentWillUnmount() {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }

    handleCloseKeyboard = () => Keyboard.dismiss()

    _keyboardDidShow = e =>
      this.setState({
        visible: true,
        height: Dimensions.get('window').height * 0.9 - e.endCoordinates.height,
      })

    _keyboardDidHide = () => this.setState({ visible: false })

    render() {
      const { visible, height } = this.state

      return (
        <Component
          {...this.props}
          keyboardHeight={height}
          isKeyboardShow={visible}
          onCloseKeyboard={this.handleCloseKeyboard}
        />
      )
    }
  }
}
