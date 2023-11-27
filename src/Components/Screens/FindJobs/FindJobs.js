import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as routes from 'Constants/routes'
import _ from 'lodash'

import { Navigation } from 'react-native-navigation'
import { TouchableWithoutFeedback } from 'react-native'
import { JobCard, JobsList, Map } from 'Components/Blocks'

import { Header } from './innerBlocks'
import { getText, tabRoutes } from './config'
import { Container, JobCardBlock } from './style'

class FindJobs extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabsState: {
        index: 0,
        routes: tabRoutes,
      },
      loading: {
        jobsList: false,
        pagination: false,
      },
      text: getText(),
    }

    this.map = React.createRef()

    Navigation.events().bindComponent(this)
  }

  componentDidMount() {
    const {
      author,
      user,
      onShowPuck,
      t,
      category,
      defaultFilters,
      navigate,
    } = this.props

    if (!user.geolocation || _.isEmpty(user.geolocation)) {
      onShowPuck({
        type: 'warning',
        message: t('apiErrors.completeProfileError'),
        text: {
          submit: t('common.openProfileWarn'),
        },
        onSubmit: () => {
          navigate.push(routes.profile)
        },
      })
    }

    let filters = { author }
    if (category) filters.services = [category]
    if (_.isObject(defaultFilters) && !_.isEmpty(defaultFilters)) {
      filters = {
        ...defaultFilters,
      }
    }

    this.handleLoadJobs(filters)
  }

  componentDidAppear() {
    this.setState({ text: getText() })
  }

  handleLoadJobs = (filters = {}, page = 0, isClearRemoved = false) => {
    const { onLoadJobsList, user, getError, onShowPuck } = this.props
    const { loading } = this.state

    if (loading.pagination || loading.jobsList) return
    this.setState(prevState => ({
      loading: {
        ...prevState.loading,
        jobsList: page === 0,
        pagination: page > 0,
      },
    }))

    onLoadJobsList({
      isPagination: page > 0,
      savedFilters: filters,
      isClearRemoved,
      filters: {
        page_number: page,
        radius: _.get(filters, 'radius', user.defaultRadius),
        geolocation:
          filters.lat && filters.lon
            ? `${filters.lat}/${filters.lon}`
            : undefined,
        categories: _.isArray(filters.services)
          ? JSON.stringify(filters.services.map(el => el._id))
          : undefined,
        keywords: _.get(filters, 'keywords'),
        order_by: _.get(filters, 'sortBy'),
        order: _.get(filters, 'order', 'asc'),
        author: _.get(filters, 'author'),
      },
      callback: ({ error }) => {
        this.setState(prevState => ({
          loading: {
            ...prevState.loading,
            jobsList: false,
            pagination: false,
          },
        }))
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
            delay: 3000,
          })
        }
      },
    })
  }

  handleResetFilters = () => {
    const { jobsFilters } = this.props

    this.handleLoadJobs(jobsFilters)
  }

  handleSetActiveTab = index =>
    this.setState(prevState => ({
      tabsState: { ...prevState.tabsState, index },
    }))

  handleFavoriteClick = vacancy => {
    const { onFavouriteClick } = this.props

    onFavouriteClick(vacancy)
  }

  handleVacancyClick = vacancy => {
    const { navigate } = this.props

    navigate.push(routes.jobDescription, { jobId: vacancy._id })
  }

  handleRemoveVacancyClick = vacancy => {
    const { onRemoveVacancy } = this.props

    onRemoveVacancy(vacancy._id)
  }

  handleOpenFilter = () => {
    const { navigate, jobsFilters } = this.props

    navigate.push(routes.filterJobs, {
      onSubmit: props => this.handleLoadJobs(props, 0, !_.isEmpty(props)),
      filters: jobsFilters,
    })
  }

  handleOpenSortModal = () => {
    const { jobsFilters, navigate } = this.props

    navigate.showModal(routes.sortedModal, {
      value: jobsFilters.sortBy,
      bool: jobsFilters.order === 'asc',
      onSubmit: (value, isStartList) =>
        this.handleLoadJobs({
          ...jobsFilters,
          sortBy: value,
          order: isStartList ? 'asc' : 'desc',
        }),
    })
  }

  handleLoadMoreJobs = () => {
    const { isEndJobsList, jobsFilters, jobsPage } = this.props

    if (!isEndJobsList) {
      this.handleLoadJobs(jobsFilters, jobsPage + 1)
    }
  }

  handleSearch = ({ keywords, service }) => {
    if (_.isObject(service)) {
      this.handleLoadJobs({ services: [service] }, 0, true)
    } else if (_.isString(keywords)) {
      this.handleLoadJobs({ keywords }, 0, true)
    }
  }

  handleOpenSearchModal = () => {
    const { navigate } = this.props

    navigate.showModal(routes.searchModal, {
      onSubmit: this.handleSearch,
    })
  }

  handleHideMapSlider = () => this.map.current.hideSlider()

  renderMapCard = ({ item }) => {
    const {
      onApplyJob,
      onJobShare,
      user,
      onFavouriteClick,
      loadingJobId,
    } = this.props

    return (
      <JobCardBlock onPress={() => this.handleVacancyClick(item)}>
        <JobCard
          {...item}
          onButtonClick={
            user.username !== item.author ? () => onApplyJob(item) : undefined
          }
          onRemoveClick={this.handleHideMapSlider}
          onShareClick={() => onJobShare(item)}
          isFavouriteLoading={loadingJobId === item._id}
          onFavouriteClick={() => onFavouriteClick(item)}
        />
      </JobCardBlock>
    )
  }

  renderContent = () => {
    const {
      jobsList,
      loadingJobId,
      loadApplyJobId,
      onApplyJob,
      user,
      onJobShare,
      onShowAd,
      isAdsLoading,
    } = this.props
    const { tabsState, loading } = this.state

    if (tabsState.index === 1) {
      return (
        <Map
          ref={this.map}
          data={jobsList}
          extraData={[loadingJobId]}
          renderMapCard={this.renderMapCard}
          onLoadMore={this.handleLoadMoreJobs}
          user={user}
        />
      )
    }

    return (
      <JobsList
        data={jobsList}
        isRefreshing={loading.jobsList}
        loadingFavoriteId={loadingJobId}
        loadingApplyId={loadApplyJobId}
        isPaginationLoading={loading.pagination}
        onFavoriteClick={this.handleFavoriteClick}
        onShareVacancyClick={onJobShare}
        onRemoveVacancy={this.handleRemoveVacancyClick}
        onLoadMoreVacancies={this.handleLoadMoreJobs}
        onVacancyClick={this.handleVacancyClick}
        onApplyClick={onApplyJob}
        onRefresh={this.handleResetFilters}
        onShowAd={onShowAd}
        isAdsLoading={isAdsLoading}
      />
    )
  }

  render() {
    const { navigate } = this.props
    const { tabsState, loading, text } = this.state

    return (
      <Container>
        <Header
          text={text.Header}
          onClickNavItem={this.handleSetActiveTab}
          activeScreenId={tabsState.index}
          onClickBack={navigate.pop}
          onClickHamburger={navigate.showSidebar}
          onClickFilter={this.handleOpenFilter}
          onClickSort={this.handleOpenSortModal}
          onSearchClick={this.handleOpenSearchModal}
          isMapDataLoading={
            tabsState.index === 1 && (loading.jobsList || loading.pagination)
          }
        />
        {this.renderContent()}
      </Container>
    )
  }
}

FindJobs.propTypes = {
  navigate: PropTypes.object.isRequired,
  onLoadJobsList: PropTypes.func.isRequired,
  jobsPage: PropTypes.number,
  jobsFilters: PropTypes.object,
  loadingJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  jobsList: PropTypes.array.isRequired,
  user: PropTypes.object,
  isEndJobsList: PropTypes.bool.isRequired,
  specificJob: PropTypes.object,
  onFavouriteClick: PropTypes.func,
  onLoadSpecificJob: PropTypes.func.isRequired,
  onRemoveVacancy: PropTypes.func,
  loadApplyJobId: PropTypes.string,
  onApplyJob: PropTypes.func,
  defaultFilters: PropTypes.object,
  onJobShare: PropTypes.func,
  onShowPuck: PropTypes.func,
  getError: PropTypes.func,
  author: PropTypes.string,
  isAdsLoading: PropTypes.bool,
}

export default FindJobs
