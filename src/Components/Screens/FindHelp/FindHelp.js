import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'
import { Navigation } from 'react-native-navigation'
import { getProfileImage } from 'Helpers/getImageUri'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'

import {
  ProviderProfileCard,
  ScreenLoader,
  ServiceProvidersList,
  Map,
} from 'Components/Blocks'

import { Header } from './innerBlocks'

import { getText } from './config'
import { Container, ProviderProfileCardWrapper, RemoveButton } from './style'

class FindHelp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: getText(),
      tabIndex: 0,
      loading: {
        serviceProviders: false,
        favouriteId: null,
        pagination: false,
      },
      isLoadingFullProfile: false,
    }

    this.map = React.createRef()

    Navigation.events().bindComponent(this)
  }

  componentDidMount() {
    this.handleLoadServiceProviders()
  }

  componentDidAppear() {
    this.setState({ text: getText() })
  }

  _setLoading = (key, value, callback) => {
    this.setState(
      prevState => ({
        loading: { ...prevState.loading, [key]: value },
      }),
      callback,
    )
  }

  handleLoadServiceProviders = (
    filters = {},
    page = 0,
    isClearRemoved = false,
  ) => {
    const { onLoadList, user, onShowPuck, getError } = this.props
    const { loading } = this.state

    if (loading.favouriteId || loading.serviceProviders) return

    this.setState(prevState => ({
      loading: {
        ...prevState.loading,
        serviceProviders: page === 0,
        pagination: page > 0,
      },
    }))

    onLoadList({
      isPagination: page > 0,
      savedFilters: filters,
      isClearRemoved,
      filters: {
        page_number: page,
        radius: filters.radius || user.defaultRadius,
        geolocation:
          filters.lat && filters.lon
            ? `${filters.lat}/${filters.lon}`
            : undefined,
        categories:
          filters.services && filters.services.length
            ? JSON.stringify(filters.services.map(el => el._id))
            : undefined,
        order_by: filters.sortBy,
        keywords: filters.keywords,
        order: filters.order || 'asc',
      },
      callback: ({ error }) => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        }
        this.setState(prevState => ({
          loading: {
            ...prevState.loading,
            serviceProviders: false,
            pagination: false,
          },
        }))
      },
    })
  }

  handleTabChange = index => this.setState({ tabIndex: index })

  handleOpenFilter = () => {
    const { navigate, filters } = this.props

    navigate.push(routes.filterJobs, {
      onSubmit: nextFilters =>
        this.handleLoadServiceProviders(
          nextFilters,
          0,
          !_.isEmpty(nextFilters),
        ),
      filters,
    })
  }

  handleFavouriteClick = provider => {
    const { onAddFavorite, onDeleteFavorite, getError, onShowPuck } = this.props

    this._setLoading('favouriteId', provider._id)

    if (_.isString(provider.favouriteId)) {
      onDeleteFavorite(provider.favouriteId, ({ error }) => {
        if (error)
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        this._setLoading('favouriteId', null)
      })
    } else {
      onAddFavorite(provider.username, ({ error }) => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        }
        this._setLoading('favouriteId', null)
      })
    }
  }

  handleShareClick = provider => {
    const { onSPShare } = this.props

    onSPShare(provider)
  }

  handleHireClick = provider => {
    const { onSendRequest } = this.props

    onSendRequest({ profile: provider })
  }

  handleOpenImages = (data, index) => {
    const { navigate } = this.props

    navigate.showModal(routes.imagesSlider, {
      data,
      activeIndex: _.isNumber(index) ? index : 1,
    })
  }

  handleLoadMore = () => {
    const { isEndList, page, filters } = this.props
    const { loading } = this.state

    if (!isEndList && !loading.serviceProviders && !loading.pagination) {
      this.handleLoadServiceProviders(filters, page + 1)
    }
  }

  handleSortClick = () => {
    const { filters, navigate } = this.props

    navigate.showModal(routes.sortedModal, {
      value: filters.sortBy,
      bool: filters.order === 'asc',
      isHelpPage: true,
      onSubmit: (value, isStartList) =>
        this.handleLoadServiceProviders({
          ...filters,
          sortBy: value,
          order: isStartList ? 'asc' : 'desc',
        }),
    })
  }

  handleRemoveServiceProvider = profile => {
    const { onRemoveServiceProvider } = this.props
    const { tabIndex } = this.state

    if (tabIndex === 1) {
      const map = this.map.current

      if (_.isFunction(map.hideSlider)) map.hideSlider()
    } else {
      onRemoveServiceProvider(_.get(profile, 'username'))
    }
  }

  handleSearch = ({ keywords, service }) => {
    if (_.isObject(service)) {
      this.handleLoadServiceProviders({ services: [service] })
    } else if (_.isString(keywords)) {
      this.handleLoadServiceProviders({ keywords })
    }
  }

  handleOpenSearchModal = () => {
    const { navigate } = this.props

    navigate.showModal(routes.searchModal, {
      onSubmit: this.handleSearch,
    })
  }

  handleOpenServiceProvider = item => {
    const { navigate } = this.props

    navigate.push(routes.serviceProviderProfile, { userId: item.username })
  }

  handleOpenReviews = profile => {
    const { navigate } = this.props

    navigate.push(routes.reviews, {
      userId: profile.username,
    })
  }

  handleRefresh = () => {
    const { filters } = this.props

    this.handleLoadServiceProviders(filters)
  }

  renderMapServiceProviderCard = ({ item }) => {
    const { loading } = this.state

    const getImage = file =>
      getProfileImage({
        type: profileImageTypes.picsOfWork,
        src: file,
        userId: item.username,
      })

    const handleImageClick = file => {
      const images = item.picsOfWork.map(el => getImage(el))

      this.handleOpenImages(images, file)
    }

    return (
      <ProviderProfileCardWrapper>
        <ProviderProfileCard
          data={item}
          isFavouriteLoading={loading.favouriteId === item._id}
          onImageClick={handleImageClick}
          onFavouriteClick={() => this.handleFavouriteClick(item)}
          onHireClick={() => this.handleHireClick(item)}
          onShareClick={() => this.handleShareClick(item)}
          onClick={() => this.handleOpenServiceProvider(item)}
          onCommentClick={() => this.handleOpenReviews(item)}
        />
        <RemoveButton onClick={() => this.handleRemoveServiceProvider(item)} />
      </ProviderProfileCardWrapper>
    )
  }

  renderListView = () => {
    const { serviceProviders, onShowAd, isAdsLoading } = this.props
    const { loading } = this.state

    return (
      <ServiceProvidersList
        data={serviceProviders}
        favouriteLoadingId={loading.favouriteId}
        isPaginationLoading={loading.pagination}
        isRefreshing={loading.serviceProviders}
        onLoadMore={this.handleLoadMore}
        onImageClick={this.handleOpenImages}
        onFavouriteClick={this.handleFavouriteClick}
        onShareClick={this.handleShareClick}
        onHireClick={this.handleHireClick}
        onRefresh={this.handleRefresh}
        onProfileClick={this.handleOpenServiceProvider}
        onRemoveServiceProviderClick={this.handleRemoveServiceProvider}
        onOpenReviews={this.handleOpenReviews}
        onShowAd={onShowAd}
        isAdsLoading={isAdsLoading}
      />
    )
  }

  renderMapView = () => {
    const { serviceProviders, user } = this.props
    const { loading } = this.state
    return (
      <Map
        ref={this.map}
        data={serviceProviders}
        extraData={[loading.favouriteId]}
        onLoadMore={this.handleLoadMore}
        renderMapCard={this.renderMapServiceProviderCard}
        user={user}
        isHelpCard
      />
    )
  }

  renderContent = () => {
    const { tabIndex } = this.state

    switch (tabIndex) {
      case 0:
        return this.renderListView()
      case 1:
        return this.renderMapView()
      default:
        return null
    }
  }

  render() {
    const { navigate } = this.props
    const { text, tabIndex, isLoadingFullProfile } = this.state

    return (
      <Container>
        <Header
          text={text.Header}
          onClickNavItem={this.handleTabChange}
          activeScreenId={tabIndex}
          onClickBack={navigate.pop}
          onClickHamburger={navigate.showSidebar}
          onClickFilter={this.handleOpenFilter}
          onClickSort={this.handleSortClick}
          onClickSearch={this.handleOpenSearchModal}
        />
        {this.renderContent()}
        <ScreenLoader visible={isLoadingFullProfile} />
      </Container>
    )
  }
}

FindHelp.propTypes = {
  navigate: PropTypes.object.isRequired,
  isEndList: PropTypes.bool,
  filters: PropTypes.object,
  page: PropTypes.number,
  user: PropTypes.object,
  serviceProviders: PropTypes.array,
  onLoadList: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired,
  onRemoveServiceProvider: PropTypes.func,
  onSendRequest: PropTypes.func,
  onSPShare: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
}

export default FindHelp
