import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import memoize from 'memoize-one'

import { FlatList } from 'react-native'
import { ApplyJobModal, JobCard } from 'Components/Blocks'
import { EmptyList } from 'Components/UI'
import { Header } from './innerBlocks'

import { Container, Content, JobCardWrapper } from './style'
import { getIsAllJobsHired } from './memoize'

class SelectJobModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      isRequest: false,
      isDateModalOpen: false,
      isHireRequest: false,
      disabledJobs: [],
    }

    this.getJobs = memoize((data, searchValue) => {
      if (!searchValue) return data

      return data.filter(
        el => el.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
      )
    })

    this.getSearchProps = memoize(search => ({
      value: search,
      onChange: this.handleChangeSearch,
      placeholder: props.t('serviceProvider.searchFromYourJobs'),
      clearTextOnFocus: true,
      onFocus: this.handleSearchFocused,
    }))

    this.getConfirmModalText = memoize(t => ({
      title: t('homePage.hiringRequests'),
      apply: t('serviceProvider.hireNow'),
      skip: t('jobPost.cancel'),
    }))

    this.job = null
  }

  componentDidMount() {
    this.handleLoadJobs()
  }

  handleSearchFocused = () => this.setState({ value: '' })

  handleLoadJobs = () => {
    const { onLoadPostedJobs, user, getError, onShowPuck } = this.props

    if (!_.isFunction(onLoadPostedJobs)) return

    const request = {
      author: user.username,
    }

    this.setState({ isRequest: true })
    onLoadPostedJobs(request, {}, ({ error }) => {
      if (error) {
        onShowPuck({
          type: 'error',
          message: getError(error),
        })
      }
      this.setState({ isRequest: false })
    })
  }

  handleChangeSearch = search => this.setState({ search })

  handleSelectJob = job => {
    this.job = job
    this.setState({ isDateModalOpen: true })
  }

  handleCloseDateModal = () => this.setState({ isDateModalOpen: false })

  handleSubmit = () => {
    const { onSubmit, onShowPuck, getError, t } = this.props
    this.setState({ isHireRequest: true }, () => {
      onSubmit(this.job, error => {
        this.setState({ isDateModalOpen: false, isHireRequest: false }, () => {
          if (error) {
            this.setState(
              prevState => ({
                disabledJobs: [...prevState.disabledJobs, this.job._id],
              }),
              () => {
                if (_.get(error, 'payload.code') === 'UserAlreadyApplied') {
                  onShowPuck({
                    type: 'error',
                    message: t('apiErrors.AlreadyApplied'),
                  })
                } else {
                  onShowPuck({
                    type: 'error',
                    message: getError(error),
                  })
                }
              },
            )
          } else onShowPuck()
        })
      })
    })
  }

  renderJobCard = ({ item }) => {
    const { username } = this.props
    const { disabledJobs } = this.state
    const isHasRequest = (item.requests || []).some(el => el.doer === username)
    const isApplied = disabledJobs.some(el => el === item._id)

    return (
      <JobCardWrapper>
        <JobCard
          {...item}
          onSelectClick={
            !isHasRequest && !isApplied
              ? () => this.handleSelectJob(item)
              : undefined
          }
        />
      </JobCardWrapper>
    )
  }

  renderEmptyList = () => {
    const { t } = this.props
    return <EmptyList>{t('apiErrors.selectJobListEmpty')}</EmptyList>
  }

  render() {
    const { navigate, jobs: data, t, username } = this.props
    const {
      search,
      isRequest,
      isDateModalOpen,
      isHireRequest,
      disabledJobs,
    } = this.state

    const searchProps = this.getSearchProps(search)

    const jobs = this.getJobs(data, search)

    const confirmModalText = this.getConfirmModalText(t)

    const isAllJobsHired = getIsAllJobsHired(data, disabledJobs, username)

    return (
      <Container>
        <Header onBackClick={navigate.hideModal} searchProps={searchProps} />
        <Content>
          <FlatList
            data={jobs}
            keyExtractor={item => item._id}
            extraData={[disabledJobs]}
            renderItem={this.renderJobCard}
            refreshing={isRequest}
            ListHeaderComponent={isAllJobsHired ? this.renderEmptyList() : null}
            ListEmptyComponent={this.renderEmptyList}
            onRefresh={this.handleLoadJobs}
          />
        </Content>
        <ApplyJobModal
          loading={isHireRequest}
          text={confirmModalText}
          visible={isDateModalOpen}
          onCancel={this.handleCloseDateModal}
          onSubmit={this.handleSubmit}
        />
      </Container>
    )
  }
}

SelectJobModal.propTypes = {
  navigate: PropTypes.object,
  user: PropTypes.object,
  jobs: PropTypes.array,
  onLoadPostedJobs: PropTypes.func,
  onSubmit: PropTypes.func,
  onShowPuck: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  activeLanguage: PropTypes.string,
  username: PropTypes.string.isRequired,
}

export default SelectJobModal
