import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'
import { isUSA } from 'Helpers/user'

import { JobCard, JobsList, ScreenLoader } from 'Components/Blocks'
import { Header } from './innerBlocks'

import { Container, Content } from './style'
import statuses from 'Constants/statuses'

class MyJobs extends Component {
  state = {
    activeTabIndex: 0,
    isLoadJobs: true,
    isLoadJob: false,
    jodDialogId: null,
  }

  componentDidMount() {
    const { activeTabIndex } = this.state

    switch (activeTabIndex) {
      case 0:
        this.handleLoadPostedJobs()
        break
      case 1:
        this.handleLoadAppliedJobs()
        break
      case 2:
        this.handleLoadBookedJobs()
        break
      default:
        break
    }
  }

  handleCloseDialog = () => this.setState({ jodDialogId: null })

  handleOpenDialog = jobId => this.setState({ jodDialogId: jobId })

  handleLoadPostedJobs = (filters = {}) => {
    const { onLoadPostedJobs, user } = this.props

    const requestFilters = {
      radius: _.get(filters, 'radius'),
      geolocation:
        filters.lat && filters.lon
          ? `${filters.lat}/${filters.lon}`
          : undefined,
      categories:
        _.isArray(filters.services) && !_.isEmpty(filters.services)
          ? JSON.stringify(filters.services.map(el => el._id))
          : undefined,
      keywords: _.get(filters, 'keywords'),
      order_by: _.get(filters, 'order_by'),
      order: _.get(filters, 'order', 'asc'),
    }

    this.setState({ isLoadJobs: true })
    onLoadPostedJobs(
      { ...requestFilters, author: user.username },
      filters,
      ({ error }) => {
        if (error) this.showError(error)
        this.setState({ isLoadJobs: false })
      },
    )
  }

  handleLoadAppliedJobs = (filters = {}) => {
    const { onLoadAppliedJobs } = this.props

    this.setState({ isLoadJobs: true })
    onLoadAppliedJobs(filters, ({ error }) => {
      if (error) this.showError(error)
      this.setState({ isLoadJobs: false })
    })
  }

  handleLoadBookedJobs = (filters = {}) => {
    const { onLoadBookedJobs } = this.props

    this.setState({ isLoadJobs: true })
    onLoadBookedJobs(filters, ({ error }) => {
      if (error) this.showError(error)
      this.setState({ isLoadJobs: false })
    })
  }

  handleChangeTabIndex = index => {
    this.setState({ activeTabIndex: index, isLoadJobs: true }, () => {
      switch (index) {
        case 0:
          this.handleLoadPostedJobs()
          break
        case 1:
          this.handleLoadAppliedJobs()
          break
        case 2:
          this.handleLoadBookedJobs()
          break
        default:
          break
      }
    })
  }

  handleOpenFilter = () => {
    const { navigate, filters } = this.props

    navigate.push(routes.filterJobs, {
      onSubmit: this.handleLoadPostedJobs,
      filters,
    })
  }

  handleEditJob = job => {
    const { navigate, loadedJob, onLoadJob } = this.props
    this.setState({ jodDialogId: null })

    const push = () => {
      setTimeout(() => {
        navigate.push(routes.postJob, { isEditMode: true })
      }, 100)
    }

    if (_.get(loadedJob, '_id') === job._id) push()
    else {
      this.setState({ isLoadJob: true })
      onLoadJob(job._id, ({ error }) => {
        this.setState({ isLoadJob: false })
        if (error) this.showError(error)
        else push()
      })
    }
  }

  handleDeleteJob = job => {
    const { onRemoveUserJob } = this.props
    this.setState({ jodDialogId: null })
    onRemoveUserJob(job._id, ({ error }) => {
      if (error) this.showError(error)
    })
  }

  handleShareJob = job => {
    const { onJobShare } = this.props

    onJobShare(job)
  }

  handleOpenJob = job => {
    const { navigate, loadedJob, onLoadJob } = this.props

    const _push = () => {
      setTimeout(() => {
        navigate.push(routes.jobDescription)
      }, 50)
    }

    if (job._id === _.get(loadedJob, '_id')) _push()
    else {
      this.setState({ isLoadJob: true })
      onLoadJob(job._id, ({ error }) => {
        this.setState({ isLoadJob: false })
        if (error) this.showError(error)
        else _push()
      })
    }
  }

  handleSubmitSearch = ({ keywords, service }) => {
    this.handleLoadPostedJobs({
      keywords,
      service: service ? [service] : undefined,
    })
  }

  handleOpenSearchModal = () => {
    const { navigate } = this.props

    navigate.showModal(routes.searchModal, {
      onSubmit: this.handleSubmitSearch,
    })
  }

  handleOpenSortModal = () => {
    const {
      navigate,
      postedJobsFilters,
      appliedJobsFilters,
      bookedJobsFilters,
    } = this.props
    const { activeTabIndex } = this.state

    let func
    let filters

    switch (activeTabIndex) {
      case 1:
        func = this.handleLoadAppliedJobs
        filters = appliedJobsFilters
        break
      case 2:
        func = this.handleLoadBookedJobs
        filters = bookedJobsFilters
        break
      default:
        func = this.handleLoadPostedJobs
        filters = postedJobsFilters
    }

    navigate.showModal(routes.sortedModal, {
      value: filters.order_by,
      bool: filters.order === 'asc',
      onSubmit: (sortBy, isStartList) => {
        func({
          ...filters,
          order_by: sortBy,
          order: isStartList ? 'asc' : 'desc',
        })
      },
    })
  }

  showError = error => {
    const { onShowPuck, getError } = this.props

    onShowPuck({
      type: 'error',
      message: getError(error),
    })
  }

  renderPostedJobCard = job => {
    const { jodDialogId } = this.state

    return (
      <JobCard
        {...job}
        isShowDialog={jodDialogId === job._id}
        onEdit={() => this.handleEditJob(job)}
        onDelete={() => this.handleDeleteJob(job)}
        onClickMore={() =>
          jodDialogId === job._id
            ? this.handleCloseDialog()
            : this.handleOpenDialog(job._id)
        }
      />
    )
  }

  renderAppliedJobCard = job => {
    const { onCancelJob } = this.props
    return <JobCard {...job} onCancelClick={() => onCancelJob(job)} />
  }

  renderBookedJobCard = job => {
    const { onCancelJob } = this.props
    return (
      <JobCard
        {...job}
        isDisabledCancelButton={job.jobStatus !== statuses.booked}
        onCancelClick={() => onCancelJob(job)}
      />
    )
  }

  _renderContent = () => {
    const {
      postedJobs,
      appliedJobs,
      bookedJobs,
      user,
      onFavouriteClick,
      loadingJobId,
      isAdsLoading,
      onShowAd,
    } = this.props
    const { activeTabIndex, isLoadJobs, jodDialogId } = this.state

    const postedJobsData = postedJobs.filter(el => el.author === user.username)

    switch (activeTabIndex) {
      case 0:
        return (
          <JobsList
            data={postedJobsData}
            extraData={[jodDialogId]}
            onRefresh={this.handleLoadPostedJobs}
            isRefreshing={isLoadJobs}
            loadingFavoriteId={loadingJobId}
            renderItem={this.renderPostedJobCard}
            onShareVacancyClick={this.handleShareJob}
            onVacancyClick={this.handleOpenJob}
            onFavoriteClick={onFavouriteClick}
            onShowAd={onShowAd}
            isAdsLoading={isAdsLoading}
          />
        )
      case 1:
        return (
          <JobsList
            data={appliedJobs}
            onRefresh={this.handleLoadAppliedJobs}
            isRefreshing={isLoadJobs}
            renderItem={this.renderAppliedJobCard}
            loadingFavoriteId={loadingJobId}
            onShareVacancyClick={this.handleShareJob}
            onVacancyClick={this.handleOpenJob}
            onFavoriteClick={onFavouriteClick}
            onShowAd={onShowAd}
            isAdsLoading={isAdsLoading}
          />
        )
      case 2:
        return (
          <JobsList
            data={bookedJobs}
            onRefresh={this.handleLoadBookedJobs}
            isRefreshing={isLoadJobs}
            renderItem={this.renderBookedJobCard}
            onShareVacancyClick={this.handleShareJob}
            onVacancyClick={this.handleOpenJob}
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
    const { activeTabIndex, isLoadJob } = this.state

    return (
      <Container>
        <Header
          activeTabIndex={activeTabIndex}
          onBackClick={navigate.pop}
          onHamburgerClick={navigate.showSidebar}
          onChangeTab={this.handleChangeTabIndex}
          onFilterClick={this.handleOpenFilter}
          isShowFilters={activeTabIndex === 0}
          onClickSortButton={this.handleOpenSortModal}
          onSearchClick={this.handleOpenSearchModal}
        />
        <Content>{this._renderContent()}</Content>
        <ScreenLoader visible={isLoadJob} />
      </Container>
    )
  }
}

MyJobs.propTypes = {
  appliedJobs: PropTypes.array,
  user: PropTypes.object,
  navigate: PropTypes.object,
  loadingJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loadedJob: PropTypes.object,
  postedJobs: PropTypes.array,
  bookedJobs: PropTypes.array,
  postedJobsFilters: PropTypes.object,
  appliedJobsFilters: PropTypes.object,
  bookedJobsFilters: PropTypes.object,
  onLoadJob: PropTypes.func,
  onLoadPostedJobs: PropTypes.func,
  onLoadAppliedJobs: PropTypes.func,
  onLoadBookedJobs: PropTypes.func,
  onCancelAppliedJob: PropTypes.func,
  onCancelBookedJob: PropTypes.func,
  onRemoveUserJob: PropTypes.func,
  onJobShare: PropTypes.func,
  onFavouriteClick: PropTypes.func,
  onCancelJob: PropTypes.func,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
  isAdsLoading: PropTypes.bool,
}

export default MyJobs
