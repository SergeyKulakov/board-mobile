import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isUrl from 'is-url'
import _ from 'lodash'
import { isBase64 } from 'Helpers/isBase64'
import { getProfileImage } from 'Helpers/getImageUri'

import Preview from 'react-native-link-preview'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Icon } from 'Components/UI'

import { hitSlop } from './config'
import { Item, RemoveButton, InfoText, styles } from './style'

class UploadImageItem extends PureComponent {
  constructor(props) {
    super(props)

    const state = {
      loading: false,
      info: props.info,
      image: null,
    }

    if (props.link) {
      state.image = props.image
    } else if (!props.jobImagesMode) {
      state.image = getProfileImage({
        type: props.type,
        src: props.image,
        userId: props.userId,
      })
    } else {
      // job image mode
      state.image = props.image
    }

    this.state = state
  }

  componentDidMount() {
    const { link } = this.props
    if (link) this.uploadImage()
  }

  componentDidUpdate(prevProps) {
    this.checkImage(prevProps)
  }

  uploadImage = async () => {
    const { link } = this.props
    const { image } = this.state
    if (link && !image) {
      this.setState({ loading: true })

      const { images, title, description } = await Preview.getPreview(link)

      this.setState({
        image: images[0],
        info: title || description,
        loading: false,
      })
    }
  }

  checkImage = prevProps => {
    const { type, image, userId, jobImagesMode } = this.props

    if (image !== prevProps.image && !jobImagesMode) {
      const nextImage = getProfileImage({
        type,
        src: image,
        userId,
      })

      this.setState({ image: nextImage })
    }
  }

  renderContent = () => {
    const { onDelete, resizeMode, isDeletable } = this.props
    const { loading, image, info } = this.state

    if (!image) {
      return (
        <>
          {loading && <ActivityIndicator />}
          {isDeletable ? (
            <RemoveButton onPress={onDelete} hitSlop={hitSlop}>
              <Icon {...styles.Icon} />
            </RemoveButton>
          ) : null}
        </>
      )
    }

    return (
      <>
        <Item
          resizeMode={resizeMode || 'cover'}
          source={isUrl(image) || isBase64(image) ? { uri: image } : image}
        >
          <>
            {loading && <ActivityIndicator />}
            {isDeletable ? (
              <RemoveButton onPress={onDelete} hitSlop={hitSlop}>
                <Icon {...styles.Icon} />
              </RemoveButton>
            ) : null}
          </>
        </Item>
        {info ? <InfoText numberOfLines={1}>{info}</InfoText> : null}
      </>
    )
  }

  render() {
    const { onItemClick } = this.props

    return (
      <TouchableOpacity
        onPress={onItemClick}
        disabled={!_.isFunction(onItemClick)}
      >
        {this.renderContent()}
      </TouchableOpacity>
    )
  }
}

UploadImageItem.propTypes = {
  userId: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  link: PropTypes.string,
  isDeletable: PropTypes.bool,
  jobImagesMode: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
  onSetLinkData: PropTypes.func,
  resizeMode: PropTypes.string,
}

UploadImageItem.defaultProps = {
  isDeletable: true,
}

export { UploadImageItem }
