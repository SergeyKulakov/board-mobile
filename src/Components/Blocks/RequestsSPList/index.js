import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { getProfileImage } from 'Helpers/getImageUri'

import { EmptyList } from 'Components/UI'
import { FlatList } from 'react-native'

import ProviderProfileCard from '../ProviderProfileCard'
import SliderAdvertising from '../SliderAdvertising'

import { CardWrapper, BannerWrapper } from './style'

class RequestsSPList extends PureComponent {
  renderBanner = () => {
    const { isAdsLoading, onShowAd } = this.props

    return (
      <BannerWrapper>
        <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
      </BannerWrapper>
    )
  }

  renderCard = ({ item }) => {
    const {
      onImagesModalOpen,
      loadSPId,
      onShareClick,
      onClickCard,
      onOpenReviews,
      onHireClick,
    } = this.props
    const { doer } = item

    if (!doer) return null

    const getImage = file =>
      getProfileImage({
        type: profileImageTypes.picsOfWork,
        src: file,
        userId: doer.username,
      })

    const handleImageClick = file => {
      const images = (doer.picsOfWork || []).map(el => getImage(el))
      onImagesModalOpen(images, file)
    }

    return (
      <CardWrapper isBig={!_.isEmpty(item.pics)}>
        <ProviderProfileCard
          data={{ ...doer, distance: item.distance }}
          getPicture={getImage}
          isFavouriteLoading={loadSPId === doer.username}
          onShareClick={() => onShareClick(doer)}
          onImageClick={handleImageClick}
          onClick={() => onClickCard(doer)}
          onCommentClick={() => onOpenReviews(item)}
          onHireClick={() => onHireClick(item)}
        />
      </CardWrapper>
    )
  }

  render() {
    const { data, onRefresh, isRefreshing, loadSPId } = this.props

    return (
      <FlatList
        data={data}
        extraData={[loadSPId]}
        keyExtractor={item => item._id}
        renderItem={this.renderCard}
        ListHeaderComponent={this.renderBanner}
        ListEmptyComponent={<EmptyList />}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    )
  }
}

RequestsSPList.propTypes = {
  data: PropTypes.array,
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  onImagesModalOpen: PropTypes.func,
  loadSPId: PropTypes.string,
  onClickCard: PropTypes.func,
  onShareClick: PropTypes.func,
  onOpenReviews: PropTypes.func,
  onHireClick: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export { RequestsSPList }
