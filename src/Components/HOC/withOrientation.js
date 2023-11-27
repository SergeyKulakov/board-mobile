import React from 'react'
import Orientation from 'react-native-orientation'

export default function(Component) {
  return class extends React.Component {
    state = {
      orientation: Orientation.getInitialOrientation(),
    }

    componentDidMount() {
      Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
      Orientation.removeOrientationListener(this._orientationDidChange)
    }

    _orientationDidChange = orientation => {
      setTimeout(() => {
        this.setState({ orientation })
      }, 100)
    }

    render() {
      const { orientation } = this.state
      return <Component {...this.props} orientation={orientation} />
    }
  }
}
