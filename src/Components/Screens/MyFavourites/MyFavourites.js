import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'

import { JobsList, ScreenLoader, ServiceProvidersList } from 'Components/Blocks'
import { Header } from './innerBlocks'

import { Container, Content } from './style'

class MyFavourites extends Component {
  state = {
    isLoadJobs: false,
    isLoadServiceProviders: false,
    isLoading: false,
    loadFavouriteId: null,
    activeTabIndex: 0,
    loadingApplyJobId: null,
  }

  componentDidMount() {
    this.handleLoadJobs()
  }

  handleLoadJobs = () => {
    const { navigate, onLoadFavoriteJobs, getError } = this.props
    this.setState({ isLoadJobs: true })
    onLoadFavoriteJobs(({ error }) => {
      this.setState({ isLoadJobs: false }, () => {
        if (error) navigate.showMessage(getError(error))
      })
    })
  }

  handleLoadServiceProviders = () => {
    const { navigate, onLoadFavoritesServiceProviders, getError } = this.props

    this.setState({ isLoadServiceProviders: true })
    onLoadFavoritesServiceProviders(({ error }) => {
      this.setState({ isLoadServiceProviders: false }, () => {
        if (error) navigate.showMessage(getError(error))
      })
    })
  }

  handleLoadJob = ({ _id }) => {
    const { navigate, onLoadJob, loadedJob, getError } = this.props

    if (_.get(loadedJob, '_id') === _id) {
      navigate.push(routes.jobDescription)
    } else {
      this.setState({ isLoading: true })
      onLoadJob(_id, ({ error }) => {
        if (error) {
          this.setState({ isLoading: false }, () => {
            navigate.showMessage(getError(error))
          })
        } else {
          this.setState({ isLoading: false }, () => {
            setTimeout(() => {
              navigate.push(routes.jobDescription)
            }, 100)
          })
        }
      })
    }
  }

  handleRemoveFavourite = job => {
    const { navigate, onDeleteFavoriteJob, getError } = this.props

    if (_.isString(job.favouriteId)) {
      this.setState({ loadFavouriteId: job.favouriteId })
      onDeleteFavoriteJob(job.favouriteId, ({ error }) => {
        if (error) navigate.showMessage(getError(error))
        this.setState({ loadFavouriteId: null })
      })
    }
  }

  handleOpenProfileImage = (data, index) => {
    const { navigate } = this.props

    navigate.showModal(routes.imagesSlider, {
      data,
      activeIndex: _.isNumber(index) ? index : 1,
    })
  }

  handleShareJob = job => {
    const { onJobShare } = this.props

    onJobShare(job)
  }

  handleHire = profile => {
    const { onSendRequest } = this.props

    onSendRequest({ profile })
  }

  handleShareServiceProvider = profile => {
    const { onSPShare } = this.props

    onSPShare(profile)
  }

  handleRemoveFavouriteServiceProvider = ({ username, favouriteId }) => {
    const { onDeleteFavoriteServiceProvider, navigate, getError } = this.props

    this.setState({ loadFavouriteId: username })
    onDeleteFavoriteServiceProvider(favouriteId, ({ error }) => {
      if (error) navigate.showMessage(getError(error))
      this.setState({ loadFavouriteId: null })
    })
  }

  handleOpenServiceProviderProfile = ({ username }) => {
    const {
      navigate,
      onLoadServiceProvide,
      loadedServiceProvider,
      getError,
    } = this.props

    if (loadedServiceProvider.username === username) {
      navigate.push(routes.serviceProviderProfile)
    } else {
      this.setState({ isLoading: true })
      onLoadServiceProvide(username, ({ error }) => {
        if (error) navigate.showMessage(getError(error))
        this.setState({ isLoading: false }, () => {
          setTimeout(() => {
            navigate.push(routes.serviceProviderProfile)
          }, 100)
        })
      })
    }
  }

  handleChangeTab = index => {
    this.setState({ activeTabIndex: index }, () => {
      if (index === 0) this.handleLoadJobs()
      else this.handleLoadServiceProviders()
    })
  }

  _renderContent = () => {
    const { jobs, serviceProviders, onApplyJob, isAdsLoading } = this.props
    const {
      activeTabIndex,
      isLoadJobs,
      isLoadServiceProviders,
      loadFavouriteId,
      loadingApplyJobId,
      onShowAd,
    } = this.state

    switch (activeTabIndex) {
      case 0:
        return (
          <JobsList
            data={jobs}
            isRefreshing={isLoadJobs}
            loadingFavoriteId={loadFavouriteId}
            loadingApplyId={loadingApplyJobId}
            onApplyClick={onApplyJob}
            onRefresh={this.handleLoadJobs}
            onVacancyClick={this.handleLoadJob}
            onFavoriteClick={this.handleRemoveFavourite}
            onShareVacancyClick={this.handleShareJob}
            onShowAd={onShowAd}
            isAdsLoading={isAdsLoading}
          />
        )
      case 1:
        return (
          <ServiceProvidersList
            data={serviceProviders}
            favouriteLoadingId={loadFavouriteId}
            onImageClick={this.handleOpenProfileImage}
            onHireClick={this.handleHire}
            onShareClick={this.handleShareServiceProvider}
            isRefreshing={isLoadServiceProviders}
            onRefresh={this.handleLoadServiceProviders}
            onFavouriteClick={this.handleRemoveFavouriteServiceProvider}
            onProfileClick={this.handleOpenServiceProviderProfile}
            onShowAd={onShowAd}
            isAdsLoading={isAdsLoading}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { navigate } = this.props
    const { isLoading, activeTabIndex } = this.state

    return (
      <Container>
        <Header
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
          activeTabIndex={activeTabIndex}
          onClickTab={this.handleChangeTab}
        />
        <Content>{this._renderContent()}</Content>
        <ScreenLoader visible={isLoading} />
      </Container>
    )
  }
}

MyFavourites.propTypes = {
  navigate: PropTypes.object,
  loadedJob: PropTypes.object,
  loadedServiceProvider: PropTypes.object,
  onLoadFavoriteJobs: PropTypes.func,
  onDeleteFavoriteJob: PropTypes.func,
  onLoadFavoritesServiceProviders: PropTypes.func,
  onDeleteFavoriteServiceProvider: PropTypes.func,
  onLoadJob: PropTypes.func,
  onLoadServiceProvide: PropTypes.func,
  jobs: PropTypes.array,
  serviceProviders: PropTypes.array,
  loadApplyJobId: PropTypes.string,
  onApplyJob: PropTypes.func,
  onJobShare: PropTypes.func,
  onSPShare: PropTypes.func,
  onSendRequest: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  isAdsLoading: PropTypes.bool,
  onShowAd: PropTypes.func,
}

export default MyFavourites
