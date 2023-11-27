import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { ActivityIndicator } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import { colors } from 'Themes'

import { Image } from 'Components/UI'

import { Icon as DefaultIcon } from 'Components/UI/Icon'

import {
  Container,
  IconContainer,
  UploadImageBlock,
  ImageContainer,
  styles,
} from './style'

class UploadImage extends PureComponent {
  state = {
    loading: false,
  }

  handleToggleState = () =>
    this.setState(prevState => ({ loading: !prevState.loading }))

  renderImage = () => {
    const { style, image } = this.props

    return (
      <ImageContainer style={style}>
        <Image resizeMode="cover" data={image} withLoading />
      </ImageContainer>
    )
  }

  render() {
    const { onChange, icon } = this.props
    const { loading } = this.state

    const Icon = _.isBoolean(icon) ? DefaultIcon : icon

    return (
      <Container>
        <PhotoUpload
          onPhotoSelect={onChange}
          onStart={this.handleToggleState}
          onResponse={this.handleToggleState}
          onError={this.handleToggleState}
          maxHeight={10000}
          maxWidth={10000}
        >
          {icon ? (
            <UploadImageBlock>
              {this.renderImage()}
              <IconContainer>
                {loading ? (
                  <ActivityIndicator {...styles.ActivityIndicator} />
                ) : (
                  <Icon name="camera" size={20} color={colors.white} />
                )}
              </IconContainer>
            </UploadImageBlock>
          ) : (
            this.renderImage()
          )}
        </PhotoUpload>
      </Container>
    )
  }
}

UploadImage.propTypes = {
  image: PropTypes.any,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  onChange: PropTypes.func.isRequired,
}

UploadImage.defaultProps = {
  style: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
}

export { UploadImage }
