import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { getProfileImage } from 'Helpers/getImageUri'
import _ from 'lodash'
import memoize from 'memoize-one'
import { getDataWithAds } from 'Helpers/advertising'

import { SwipeListView } from 'react-native-swipe-list-view'
import { SliderAdvertising, ProviderProfileCard } from 'Components/Blocks'
import { PaginationLoader, EmptyList, RemoveCardAction } from 'Components/UI'

import config from './config'
import {
  Container,
  Block,
  AnimateView,
  AnimateRowView,
  RemoveCardActionWrapper,
  CardWrapper,
  ProviderProfileCardWrapper,
} from './style'

class ServiceProvidersList extends PureComponent {
  prevScrollPosition = 0

  isScrollToTop = false

  removedItemId = null

  items = {}

  hiddenActions = {}

  getItemsList = memoize(getDataWithAds)

  handleStartRemoveAnimation = (rowKey, rowMap) => {
    const { onRemoveServiceProviderClick } = this.props

    if (this.removedItemId) {
      this.hiddenActions[this.removedItemId].animate('fadeOutLeft', 10, 10)
      this.items[this.removedItemId]
        .animate('fadeOutLeft', 400, 10)
        .then(() => {
          onRemoveServiceProviderClick(rowMap[rowKey].props.item)
          this.removedItemId = null
          delete this.items[rowKey]
          delete this.hiddenActions[rowKey]
        })
    }
  }

  handleScroll = ({ nativeEvent }) => {
    this.isScrollToTop = this.prevScrollPosition > nativeEvent.contentOffset.y
    this.prevScrollPosition = nativeEvent.contentOffset.y
  }

  handleLoadMore = ({ distanceFromEnd }) => {
    const { onLoadMore } = this.props

    if (
      distanceFromEnd > 0 &&
      !this.isScrollToTop &&
      _.isFunction(onLoadMore)
    ) {
      onLoadMore()
    }
  }

  handleProfileClick = ({ item }, rowMap) => {
    const { onProfileClick } = this.props

    if (this.openedItemId) {
      rowMap[item._id].closeRow()
      return
    }

    onProfileClick(item)
  }

  renderRow = (rowData, rowMap) => {
    const { item } = rowData
    const {
      onImageClick,
      onFavouriteClick,
      onShareClick,
      onHireClick,
      favouriteLoadingId,
      renderItem,
      onOpenReviews,
      onShowAd,
      isAdsLoading,
    } = this.props

    if (_.isString(item))
      return (
        <SliderAdvertising
          type={item}
          key={Math.random()}
          onShowAd={onShowAd}
          isLoading={isAdsLoading}
        />
      )

    return (
      <AnimateRowView
        ref={ref => (this.items[item._id] = ref)}
        animation="slideInRight"
      >
        {_.isFunction(renderItem) ? (
          renderItem(item)
        ) : (
          <CardWrapper>
            <ProviderProfileCardWrapper isBig={_.isEmpty(item.picsOfWork)}>
              <ProviderProfileCard
                data={item}
                isBig={_.isEmpty(item.picsOfWork)}
                isFavouriteLoading={item._id === favouriteLoadingId}
                onFavouriteClick={() => onFavouriteClick(item)}
                onShareClick={() => onShareClick(item)}
                onHireClick={() => onHireClick(item)}
                onClick={() => this.handleProfileClick(rowData, rowMap)}
                onCommentClick={() => onOpenReviews(item)}
              />
            </ProviderProfileCardWrapper>
          </CardWrapper>
        )}
      </AnimateRowView>
    )
  }

  openRow = (rowKey, rowMap) => {
    this.openedItemId = rowKey
    rowMap[rowKey].closeRow()
    this.handleStartRemoveAnimation(rowKey, rowMap)
  }

  checkRemoveItem = ({ isOpen, key, value }) => {
    if (!this.removedItemId && isOpen && value > 140) this.removedItemId = key
    else if (this.removedItemId && !isOpen && value > 140) {
      this.removedItemId = null
    }
  }

  renderHiddenItems = ({ item }) => {
    if (_.isString(item)) return null

    return (
      <AnimateView
        ref={ref => (this.hiddenActions[item._id] = ref)}
        animation="slideInRight"
      >
        <RemoveCardActionWrapper>
          <RemoveCardAction />
        </RemoveCardActionWrapper>
      </AnimateView>
    )
  }

  render() {
    const {
      data,
      favouriteLoadingId,
      isPaginationLoading,
      isRefreshing,
      onRefresh,
      orientation,
      onRemoveServiceProviderClick,
      onShowAd,
      isAdsLoading,
    } = this.props

    const itemsList = this.getItemsList(data)

    return (
      <Container>
        <SwipeListView
          extraData={[
            favouriteLoadingId,
            isRefreshing,
            orientation,
            isAdsLoading,
          ]}
          data={itemsList}
          renderItem={this.renderRow}
          renderHiddenItem={this.renderHiddenItems}
          ListHeaderComponent={
            <Block mb={-1}>
              <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
            </Block>
          }
          ListFooterComponent={
            <PaginationLoader visible={Boolean(isPaginationLoading)} />
          }
          ListEmptyComponent={<EmptyList />}
          onRowOpen={this.openRow}
          onRowClose={() => (this.openedItemId = null)}
          onSwipeValueChange={this.checkRemoveItem}
          onEndReached={this.handleLoadMore}
          onScroll={this.handleScroll}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          disableRightSwipe={!_.isFunction(onRemoveServiceProviderClick)}
          {...config}
        />
      </Container>
    )
  }
}

ServiceProvidersList.propTypes = {
  data: PropTypes.array,
  isRefreshing: PropTypes.bool,
  isPaginationLoading: PropTypes.bool,
  favouriteLoadingId: PropTypes.string,
  orientation: PropTypes.string,
  renderItem: PropTypes.func,
  onImageClick: PropTypes.func.isRequired,
  onFavouriteClick: PropTypes.func,
  onShareClick: PropTypes.func,
  onHireClick: PropTypes.func,
  onLoadMore: PropTypes.func,
  onRefresh: PropTypes.func,
  onRemoveServiceProviderClick: PropTypes.func,
  onProfileClick: PropTypes.func,
  onOpenReviews: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default ServiceProvidersList
