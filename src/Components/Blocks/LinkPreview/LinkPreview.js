import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Preview from 'react-native-link-preview'
import {
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native'
import qs from 'qs'

import {
  YouTubeStandaloneAndroid,
  YouTubeStandaloneIOS,
} from 'react-native-youtube'

import { UploadImageItem, InputModal } from '../index'

import { Container, PlusIcon, AddButton, ItemContainer, styles } from './style'

class LinkPreview extends PureComponent {
  state = {
    value: 'http://',
    isModalOpen: false,
    loading: false,
  }

  handleAddLink = async link => {
    let value = link

    const { onAdd, inputType, toast, t } = this.props

    if (!_.isFunction(onAdd)) return null

    if (value.startsWith('http://http')) value = value.slice(7)
    if (!value.startsWith('http')) value = `http://${value}`

    this.handleCloseModal()

    this.setState({ loading: true })

    try {
      const data = await Preview.getPreview(value)

      const addLink = () =>
        onAdd({
          link: data.url,
          image: data.images[0] || data.favicons[0],
          ...data,
        })

      const errorHandler = () => {
        toast(t('common.invalidLink'))
      }

      if (inputType === 'video') {
        if (data.mediaType === 'video' || data.mediaType === 'video.other') {
          addLink()
        } else {
          errorHandler()
        }
      } else {
        addLink()
      }
    } catch (err) {
      if (_.isFunction(toast)) toast(t('common.invalidLink'))
    }

    this.setState({ loading: false })
  }

  handleOpenLink = link => {
    const { inputType } = this.props
    if (inputType === 'video') {
      if (!link.includes('youtube') && !link.includes('youtu.be')) {
        Linking.openURL(link)
        return
      }

      const query = link.split('?')

      const { v } = qs.parse(query[1])

      const videoId = v || link.split('/').slice(-1)[0]

      if (Platform.OS === 'ios') {
        YouTubeStandaloneIOS.playVideo(videoId)
      } else {
        YouTubeStandaloneAndroid.playVideo({
          apiKey: 'AIzaSyDQktH2q0DEchVpQWatER5SXx-3m2fECzg',
          videoId,
          autoplay: true,
        }).catch(err => {
          if (__DEV__) console.warn('err: ', err)
        })
      }
    } else {
      Linking.openURL(link)
    }
  }

  handleOpenModal = () => this.setState({ isModalOpen: true })

  handleCloseModal = () =>
    this.setState({ isModalOpen: false, value: 'http://' })

  handleChange = value => this.setState({ value })

  renderHeaderComponent = () => {
    const { onAdd } = this.props
    const { loading } = this.state

    if (!_.isFunction(onAdd)) return null

    return (
      <TouchableOpacity onPress={this.handleOpenModal}>
        <AddButton>
          {loading ? (
            <ActivityIndicator {...styles.ActivityIndicator} />
          ) : (
            <PlusIcon />
          )}
        </AddButton>
      </TouchableOpacity>
    )
  }

  renderItem = ({ item }) => {
    const { onDelete } = this.props

    return (
      <ItemContainer testID="ItemContainer">
        <UploadImageItem
          link={item.link}
          onItemClick={() => this.handleOpenLink(item.link)}
          isDeletable={_.isFunction(onDelete)}
          onDelete={() => onDelete(item.id)}
          image={item.image}
          info={item.info}
          onSetLinkData={() => this.handleAddLink(item.link)}
        />
      </ItemContainer>
    )
  }

  render() {
    const {
      title,
      data,
      onBlur,
      placeholder,
      onAdd,
      style,
      orientation,
    } = this.props
    const { isModalOpen, value, loading } = this.state

    return (
      <Container style={style}>
        <FlatList
          testID="FlatList"
          keyExtractor={item => item.link}
          data={data}
          horizontal
          extraData={[loading, orientation]}
          ListHeaderComponent={this.renderHeaderComponent}
          renderItem={this.renderItem}
        />

        {_.isFunction(onAdd) ? (
          <InputModal
            testID="InputModal"
            animatedLine
            title={title}
            visible={isModalOpen}
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
            onSubmit={() => this.handleAddLink(value)}
            onCancel={this.handleCloseModal}
            onBlur={onBlur}
            onEndEditing={() => this.handleAddLink(value)}
          />
        ) : null}
      </Container>
    )
  }
}

LinkPreview.propTypes = {
  inputType: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onBlur: PropTypes.func,
  toast: PropTypes.func,
  onSetLinkData: PropTypes.func,
  disabledLoading: PropTypes.bool,
  orientation: PropTypes.string,
}

export default LinkPreview
