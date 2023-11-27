import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isUrl from 'is-url'
import { isBase64 } from 'Helpers/isBase64'
import _ from 'lodash'

import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native'

import { Container, LoaderContainer, styles } from './style'

class Image extends PureComponent {
  state = {
    loading: false,
  }

  handleToggleLoading = (bool, callback) => {
    const { withLoading } = this.props
    if (withLoading) this.setState({ loading: bool }, callback)
  }

  handleLoadStart = () => {
    const { onLoadStart } = this.props

    this.handleToggleLoading(true, () => {
      if (_.isFunction(onLoadStart)) onLoadStart()
    })
  }

  handleLoadEnd = () => {
    const { onLoadEnd } = this.props

    this.handleToggleLoading(false, () => {
      if (_.isFunction(onLoadEnd)) onLoadEnd()
    })
  }

  renderContent = () => {
    const {
      children,
      data,
      loaderStyle,
      style,
      resizeMode,
      ...props
    } = this.props
    const { loading } = this.state

    const source = isUrl(data) || isBase64(data) ? { uri: data } : data

    if (!source) return <LoaderContainer />
    return (
      <Container
        testID="imageWrapper"
        onLoadStart={this.handleLoadStart}
        onLoadEnd={this.handleLoadEnd}
        source={source}
        resizeMode={resizeMode}
        style={style}
        {...props}
      >
        {loading ? (
          <LoaderContainer>
            <ActivityIndicator {...styles.getActivityIndicator(loaderStyle)} />
          </LoaderContainer>
        ) : (
          children
        )}
      </Container>
    )
  }

  render() {
    const { onClick } = this.props

    return (
      <TouchableWithoutFeedback
        disabled={!_.isFunction(onClick)}
        onPress={onClick}
      >
        {this.renderContent()}
      </TouchableWithoutFeedback>
    )
  }
}

Image.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withLoading: PropTypes.bool,
  loaderStyle: PropTypes.object,
  resizeMode: PropTypes.string,
  onLoadStart: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onClick: PropTypes.func,
}

Image.defaultProps = {
  resizeMode: 'contain',
  loaderStyle: {},
}

export { Image }
