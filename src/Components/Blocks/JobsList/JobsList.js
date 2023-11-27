import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import memoize from 'memoize-one'
import { getDataWithAds } from 'Helpers/advertising'

import * as Animatable from 'react-native-animatable'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import {
  EmptyList,
  PaginationLoader,
  RemoveCardAction,
  RightActionsJobCard,
} from 'Components/UI'
import { JobCard, SliderAdvertising } from '../index'

import {
  ItemContainer,
  ActionsContainer,
  SliderAdvertisingBlock,
} from './style'
import config from './config'

class JobsList extends Component {
  openedItemId = null

  removedItemId = null

  jobs = {}

  hiddenActions = {}

  state = {}

  getJobsList = memoize(getDataWithAds)

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

  handleVacancyClick = ({ item }, rowMap) => {
    const { onVacancyClick } = this.props

    if (!this.openedItemId && _.isFunction(onVacancyClick)) onVacancyClick(item)
    else rowMap[item._id].closeRow()
  }

  handleLoadMore = ({ distanceFromEnd }) => {
    const { onLoadMoreVacancies } = this.props

    if (
      distanceFromEnd > 0 &&
      !this.isScrollToTop &&
      _.isFunction(onLoadMoreVacancies)
    ) {
      onLoadMoreVacancies()
    }
  }

  handleScroll = ({ nativeEvent }) => {
    this.isScrollToTop = this.prevScrollPosition > nativeEvent.contentOffset.y
    this.prevScrollPosition = nativeEvent.contentOffset.y
  }

  checkRemoveItem = ({ isOpen, key, value }) => {
    if (!this.removedItemId && isOpen && value > 140) this.removedItemId = key
    else if (this.removedItemId && !isOpen && value > 140) {
      this.removedItemId = null
    }
  }

  openRow = (rowKey, rowMap, SwipeRowRef) => {
    this.openedItemId = rowKey
    if (SwipeRowRef === config.SwipeListView.leftOpenValue) {
      rowMap[rowKey].closeRow()
      this.handleStartRemoveAnimation(rowKey, rowMap)
    }
  }

  renderRow = (rowData, rowMap) => {
    const {
      onApplyClick,
      renderItem,
      user,
      onShowAd,
      isAdsLoading,
      onFavoriteClick,
      onShareVacancyClick,
    } = this.props
    const { item } = rowData

    if (_.isString(item))
      return (
        <SliderAdvertising
          isLoading={isAdsLoading}
          type={item}
          key={Math.random()}
          onShowAd={onShowAd}
        />
      )

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
                onButtonClick={
                  _.isFunction(onApplyClick) && item.author !== user.username
                    ? () => onApplyClick(item)
                    : undefined
                }
                onFavouriteClick={
                  _.isFunction(onFavoriteClick) && user.username !== item.author
                    ? () => {onFavoriteClick(item)}
                    : undefined
                }
                onShareClick={() => onShareVacancyClick(item)}
              />
            )}
          </ItemContainer>
        </TouchableWithoutFeedback>
      </Animatable.View>
    )
  }

  renderHiddenItems = ({ item }) => {
    const {
      loadingFavoriteId,
      onFavoriteClick,
      onShareVacancyClick,
      user,
    } = this.props

    if (_.isString(item)) return null

    return (
      <Animatable.View
        ref={ref => (this.hiddenActions[item._id] = ref)}
        animation="slideInRight"
        style={{ flex: 1 }}
      >
        <ActionsContainer>
          <RemoveCardAction />
          <RightActionsJobCard
            isActiveFavorite={_.isString(item.favouriteId)}
            loading={
              _.isString(loadingFavoriteId) && loadingFavoriteId === item._id
            }
            isFavouriteCallable={
              _.isFunction(onFavoriteClick) && user.username !== item.author
            }
            onFavoriteClick={() => onFavoriteClick(item)}
            onShareClick={() => onShareVacancyClick(item)}
          />
        </ActionsContainer>
      </Animatable.View>
    )
  }

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
      onRemoveVacancy,
      onFavoriteClick,
      onShareVacancyClick,
      extraData,
      isAdsLoading,
    } = this.props

    const jobsList = this.getJobsList(data)

    return (
      <SwipeListView
        extraData={[
          orientation,
          isPaginationLoading,
          isRefreshing,
          isAdsLoading,
          ...(extraData || []),
        ]}
        data={jobsList}
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
        onEndReached={this.handleLoadMore}
        onScroll={this.handleScroll}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        disableRightSwipe={!_.isFunction(onRemoveVacancy)}
        disableLeftSwipe={
          !_.isFunction(onFavoriteClick) && !_.isFunction(onShareVacancyClick)
        }
        {...config.SwipeListView}
      />
    )
  }
}

JobsList.propTypes = {
  data: PropTypes.array,
  isPaginationLoading: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  loadingFavoriteId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onApplyClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  onLoadMoreVacancies: PropTypes.func,
  onRefresh: PropTypes.func,
  onRemoveVacancy: PropTypes.func,
  onShareVacancyClick: PropTypes.func,
  onVacancyClick: PropTypes.func,
  orientation: PropTypes.string,
  renderItem: PropTypes.func,
  user: PropTypes.object,
  extraData: PropTypes.array,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default JobsList
