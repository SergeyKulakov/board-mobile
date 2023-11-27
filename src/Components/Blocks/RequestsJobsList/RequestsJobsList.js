import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import * as Animatable from 'react-native-animatable'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { EmptyList, PaginationLoader, DragCardAction } from 'Components/UI'
import { JobCard, SliderAdvertising } from '../index'

import {
  ItemContainer,
  ActionsContainer,
  SliderAdvertisingBlock,
} from './style'
import config from './config'

class RequestsJobsList extends Component {
  openedItemId = null

  jobs = {}

  hiddenActions = {}

  acceptedItem = null

  removedItemId = null

  isScrollToTop = false

  handleStartRemoveAnimation = (rowKey, rowMap) => {
    const { onRemoveVacancy } = this.props

    if (this.removedItemId) {
      this.hiddenActions[this.removedItemId].animate('fadeOutLeft', 10, 10)
      this.jobs[this.removedItemId].animate('fadeOutLeft', 400, 10).then(() => {
        onRemoveVacancy(rowMap[rowKey].props.item)
        this.removedItemId = null
        delete this.jobs[rowKey]
        delete this.hiddenActions[rowKey]
      })
    }
  }

  handleStartAcceptAnimation = (rowKey, rowMap) => {
    const { onAccept } = this.props

    if (this.acceptedItem) {
      this.hiddenActions[this.acceptedItem].animate('fadeOutRight', 10, 10)
      this.jobs[this.acceptedItem].animate('fadeOutRight', 400, 10).then(() => {
        onAccept(rowMap[rowKey].props.item)
        this.acceptedItem = null
        delete this.jobs[rowKey]
        delete this.hiddenActions[rowKey]
      })
    }
  }

  handleVacancyClick = ({ item }, rowMap) => {
    const { onVacancyClick } = this.props
    if (!this.openedItemId && _.isFunction(onVacancyClick)) onVacancyClick(item)
    else rowMap[item._id].closeRow()
  }

  // handleLoadMore = ({ distanceFromEnd }) => {
  //   const { onLoadMoreVacancies } = this.props
  //
  //   if (
  //     distanceFromEnd > 0 &&
  //     !this.isScrollToTop &&
  //     _.isFunction(onLoadMoreVacancies)
  //   ) {
  //     onLoadMoreVacancies()
  //   }
  // }

  handleScroll = ({ nativeEvent }) => {
    this.isScrollToTop = this.prevScrollPosition > nativeEvent.contentOffset.y
    this.prevScrollPosition = nativeEvent.contentOffset.y
  }

  checkRemoveItem = ({ isOpen, key, value }) => {
    if (!this.removedItemId && isOpen && value > 140) this.removedItemId = key
    else if (this.removedItemId && !isOpen && value > 140) {
      this.removedItemId = null
    }

    if (!this.acceptedItem && value > -140) this.acceptedItem = key
    else if (this.acceptedItem && value > -140) {
      this.acceptedItem = null
    }
  }

  openRow = (rowKey, rowMap, SwipeRowRef) => {
    this.openedItemId = rowKey
    if (SwipeRowRef === config.SwipeListView.leftOpenValue) {
      rowMap[rowKey].closeRow()
      this.handleStartRemoveAnimation(rowKey, rowMap)
    }

    if (SwipeRowRef === config.SwipeListView.rightOpenValue) {
      rowMap[rowKey].closeRow()
      this.handleStartAcceptAnimation(rowKey, rowMap)
    }
  }

  renderRow = (rowData, rowMap) => {
    const {
      renderItem,
      onFavoriteClick,
      onShareVacancyClick,
      loadingFavoriteId,
    } = this.props
    const { item } = rowData

    return (
      <Animatable.View
        ref={ref => (this.jobs[item._id] = ref)}
        animation="slideInRight"
        style={{ minHeight: Platform.select({ ios: 220, android: 225 }) }}
      >
        <TouchableWithoutFeedback
          onPress={() => this.handleVacancyClick(rowData, rowMap)}
        >
          <ItemContainer>
            {_.isFunction(renderItem) ? (
              renderItem(item)
            ) : (
              <JobCard
                {...item}
                isFavouriteLoading={loadingFavoriteId === item._id}
                onFavouriteClick={() => onFavoriteClick(item)}
                onShareClick={() => onShareVacancyClick(item)}
              />
            )}
          </ItemContainer>
        </TouchableWithoutFeedback>
      </Animatable.View>
    )
  }

  renderHiddenItems = ({ item }) => (
    <Animatable.View
      ref={ref => (this.hiddenActions[item._id] = ref)}
      animation="slideInRight"
      style={{ flex: 1 }}
    >
      <ActionsContainer>
        <DragCardAction isReject />
        <DragCardAction />
      </ActionsContainer>
    </Animatable.View>
  )

  renderHeaderComponent = () => {
    const { onShowAd, isAdsLoading } = this.props
    return (
      <SliderAdvertisingBlock>
        <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
      </SliderAdvertisingBlock>
    )
  }

  render() {
    const {
      orientation,
      isPaginationLoading,
      isRefreshing,
      onRefresh,
      data,
      extraData,
    } = this.props

    return (
      <SwipeListView
        extraData={[
          orientation,
          isPaginationLoading,
          isRefreshing,
          ...(extraData || []),
        ]}
        data={data}
        renderItem={this.renderRow}
        renderHiddenItem={this.renderHiddenItems}
        ListHeaderComponent={this.renderHeaderComponent}
        ListFooterComponent={
          <PaginationLoader visible={Boolean(isPaginationLoading)} />
        }
        ListEmptyComponent={<EmptyList />}
        onRowOpen={this.openRow}
        onRowClose={() => (this.openedItemId = null)}
        onSwipeValueChange={this.checkRemoveItem}
        // onEndReached={this.handleLoadMore}
        onScroll={this.handleScroll}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        {...config.SwipeListView}
      />
    )
  }
}

RequestsJobsList.propTypes = {
  data: PropTypes.array,
  isPaginationLoading: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  loadingFavoriteId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onApplyClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  onLoadMoreVacancies: PropTypes.func,
  onRefresh: PropTypes.func,
  onShareVacancyClick: PropTypes.func,
  onVacancyClick: PropTypes.func,
  orientation: PropTypes.string,
  renderItem: PropTypes.func,
  user: PropTypes.object,
  extraData: PropTypes.array,
  onRemoveVacancy: PropTypes.func,
  onAccept: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default RequestsJobsList
