import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import * as routes from 'Constants/routes'
import _ from 'lodash'

import {
  RequestsJobsList,
  ScreenLoader,
  RequestsSPList,
} from 'Components/Blocks'
import { Header } from './innerBlocks'

import { Container, Content } from './style'

class MyRequests extends PureComponent {
  state = {
    activeTabId: 0,
    isLoadJobs: false,
    isLoadSP: false,
    isRequest: false,
  }

  componentDidMount() {
    this.handleLoadJobs()
    this.handleLoadServiceProviders()
  }

  showError = (error, callback) => {
    const { onShowPuck, getError } = this.props

    onShowPuck({
      type: 'error',
      message: getError(error),
      delay: 3000,
      callback,
    })
  }

  handleLoadJobs = () => {
    const { navigate, onLoadRequestsJobs, getError } = this.props

    this.setState({ isLoadJobs: true })

    onLoadRequestsJobs(({ error }) => {
      if (error) navigate.showMessage(getError(error))
      this.setState({ isLoadJobs: false })
    })
  }

  handleLoadServiceProviders = () => {
    const { navigate, onLoadRequestsSP, getError } = this.props

    this.setState({ isLoadSP: true })
    onLoadRequestsSP(({ error }) => {
      if (error) navigate.showMessage(getError(error))
      this.setState({ isLoadSP: false })
    })
  }

  handleChangeActiveTab = nextActiveTabId => {
    this.setState({ activeTabId: nextActiveTabId })
  }

  handleShareJob = job => {
    const { onJobShare } = this.props

    onJobShare(job)
  }

  handleShareSP = doer => {
    const { onSPShare } = this.props

    onSPShare(doer)
  }

  handleOpenJobDescription = job => {
    const { navigate, onLoadJob, loadedJob, getError } = this.props

    if (_.get(loadedJob, '_id') === job._id)
      navigate.push(routes.jobDescription)
    else {
      this.setState({ isRequest: true })

      onLoadJob(job._id, ({ error }) => {
        this.setState({ isRequest: false })
        if (error) navigate.showMessage(getError(error))
        else navigate.push(routes.jobDescription)
      })
    }
  }

  handleOpenSPProfile = user => {
    const { navigate, onLoadProfile, loadedSP, getError } = this.props

    if (_.get(loadedSP, 'username') === user.username)
      navigate.push(routes.jobDescription)
    else {
      this.setState({ isRequest: true })

      onLoadProfile(user._id, ({ error }) => {
        this.setState({ isRequest: false })
        if (error) navigate.showMessage(getError(error))
        else navigate.push(routes.serviceProviderProfile)
      })
    }
  }

  handleOpenImagesModal = (data, index) => {
    const { navigate } = this.props

    navigate.showModal(routes.imagesSlider, {
      data,
      activeIndex: _.isNumber(index) ? index : 1,
    })
  }

  handleReject = job => {
    const { onRejectRequest } = this.props

    onRejectRequest(job.jobRequest)
  }

  handleAccept = job => {
    const { onAcceptRequest } = this.props

    onAcceptRequest(job.jobRequest)
  }

  handleSendRequest = job => {
    const { onSendRequest } = this.props

    onSendRequest({ profile: job.doer })
  }

  handleOpenReviews = job => {
    const { navigate } = this.props
    const userId = _.get(job, 'doer.username')
    navigate.push(routes.reviews, { userId })
  }

  _renderSPList = () => {
    const { serviceProviders, onShowAd, isAdsLoading } = this.props
    const { isLoadSP } = this.state

    return (
      <RequestsSPList
        onShareClick={this.handleShareSP}
        data={serviceProviders}
        onClickCard={this.handleOpenSPProfile}
        onRefresh={this.handleLoadServiceProviders}
        isRefreshing={isLoadSP}
        onImagesModalOpen={this.handleOpenImagesModal}
        onOpenReviews={this.handleOpenReviews}
        onHireClick={this.handleSendRequest}
        onShowAd={onShowAd}
        isAdsLoading={isAdsLoading}
      />
    )
  }

  _renderJobsList = () => {
    const {
      loadingJobId,
      onFavouriteClick,
      jobs,
      onShowAd,
      isAdsLoading,
    } = this.props
    const { isLoadJobs } = this.state

    return (
      <RequestsJobsList
        data={jobs}
        loadingFavoriteId={loadingJobId}
        onShareVacancyClick={this.handleShareJob}
        onFavoriteClick={onFavouriteClick}
        isRefreshing={isLoadJobs}
        onRemoveVacancy={this.handleReject}
        onRefresh={this.handleLoadJobs}
        onAccept={this.handleAccept}
        onVacancyClick={this.handleOpenJobDescription}
        onShowAd={onShowAd}
        isAdsLoading={isAdsLoading}
      />
    )
  }

  _renderContent = () => {
    const { activeTabId } = this.state

    if (activeTabId === 1) {
      return this._renderSPList()
    }

    return this._renderJobsList()
  }

  render() {
    const { navigate } = this.props
    const { activeTabId, isRequest } = this.state

    return (
      <Container>
        <Header
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
          onClickTab={this.handleChangeActiveTab}
          activeTabId={activeTabId}
        />
        <Content>{this._renderContent()}</Content>
        <ScreenLoader visible={isRequest} />
      </Container>
    )
  }
}

MyRequests.propTypes = {
  navigate: PropTypes.object,
  loadingJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onFavouriteClick: PropTypes.func,
  onLoadRequestsJobs: PropTypes.func,
  onLoadRequestsSP: PropTypes.func,
  jobs: PropTypes.array,
  serviceProviders: PropTypes.array,
  onLoadJob: PropTypes.func,
  onLoadProfile: PropTypes.func,
  loadedJob: PropTypes.object,
  loadedSP: PropTypes.object,
  onAcceptRequest: PropTypes.func,
  onRejectRequest: PropTypes.func,
  onShowPuck: PropTypes.func,
  getError: PropTypes.func,
  t: PropTypes.func,
  onJobShare: PropTypes.func,
  onSPShare: PropTypes.func,
  onSendRequest: PropTypes.func,
  onShowAd: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default MyRequests
