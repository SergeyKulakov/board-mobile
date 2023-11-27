import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import i18n from 'I18N'
import _ from 'lodash'

import { FlatList, ActivityIndicator } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'

import { UploadImageItem } from './innerBlocks'
import {
  Container,
  PlusIcon,
  AddButton,
  Title,
  SubTitle,
  ListContainer,
  styles,
} from './style'

class UploadImages extends PureComponent {
  state = {
    loading: false,
  }

  startLoading = () => this.setState({ loading: true })

  stopLoading = () => this.setState({ loading: false })

  handleResponse = value => {
    const { toast } = this.props
    this.setState({ loading: false })
    if (value.error === 'Photo library permissions not granted')
      toast(
        i18n.t(
          'profilePage.fields.certificates.validationErrors.photoPermissions',
        ),
      )

    if (value.error === 'Camera permissions not granted')
      toast(
        i18n.t(
          'profilePage.fields.certificates.validationErrors.cameraPermissions',
        ),
      )
  }

  handleItemClick = index => {
    const { onClickImage } = this.props

    if (_.isFunction(onClickImage)) onClickImage(index)
  }

  renderHeaderComponent = () => {
    const { loading } = this.state
    const { onAdd } = this.props

    return (
      <PhotoUpload
        onPhotoSelect={onAdd}
        maxHeight={10000}
        maxWidth={10000}
        onStart={this.startLoading}
        onResponse={this.handleResponse}
        onError={this.stopLoading}
      >
        <AddButton>
          {loading ? (
            <ActivityIndicator {...styles.ActivityIndicator} />
          ) : (
            <PlusIcon />
          )}
        </AddButton>
      </PhotoUpload>
    )
  }

  renderItem = ({ item, index }) => {
    const { userId, type, jobImagesMode, onDelete } = this.props

    return (
      <UploadImageItem
        userId={userId}
        type={type}
        id={item.id}
        onDelete={() => onDelete(item.id)}
        image={item.image}
        jobImagesMode={jobImagesMode}
        onItemClick={() => this.handleItemClick(index)}
      />
    )
  }

  render() {
    const { title, subTitle, data } = this.props

    return (
      <Container>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <ListContainer>
          <FlatList
            keyExtractor={item => String(item.id)}
            data={data}
            horizontal
            ListHeaderComponent={this.renderHeaderComponent}
            renderItem={this.renderItem}
          />
        </ListContainer>
      </Container>
    )
  }
}

UploadImages.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  jobImagesMode: PropTypes.bool,
  data: PropTypes.array,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
  onClickImage: PropTypes.func,
}

export { UploadImages, UploadImageItem }
