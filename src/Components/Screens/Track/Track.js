import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as routes from 'Constants/routes'
import memoize from 'memoize-one'
import { getDataWithAds } from 'Helpers/advertising'
import _ from 'lodash'

import { FlatList, TouchableWithoutFeedback } from 'react-native'
import { JobCard, SliderAdvertising } from 'Components/Blocks'
import { Header } from './innerBlocks'
import { Wrapper, JobCardWrapper } from './style'

class Track extends Component {
  state = {
    isRequest: true,
  }

  getJobList = memoize(getDataWithAds)

  componentDidMount() {
    this.handleUpdateTrackJobs()
  }

  handleUpdateTrackJobs = () => {
    const { onLoadTrackJobs, onShowPuck, getError } = this.props

    this.setState({ isRequest: true })
    onLoadTrackJobs(({ error }) => {
      this.setState({ isRequest: false })
      if (error) {
        onShowPuck({
          type: 'error',
          message: getError(error),
        })
      }
    })
  }

  handleOpenJobDescription = job => {
    const { navigate } = this.props

    navigate.push(routes.jobDescription, { jobId: job._id })
  }

  renderJobCard = ({ item }) => {
    const { onStartTracking, isAdsLoading, onShowAd } = this.props

    if (_.isString(item)) {
      return (
        <SliderAdvertising
          type={item}
          onShowAd={onShowAd}
          isLoading={isAdsLoading}
        />
      )
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => this.handleOpenJobDescription(item)}
      >
        <JobCardWrapper>
          <JobCard {...item} onTrackClick={() => onStartTracking(item)} />
        </JobCardWrapper>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { navigate, jobs, isAdsLoading, onShowAd } = this.props
    const { isRequest } = this.state

    const data = this.getJobList(jobs)

    return (
      <Wrapper>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
        />

        <FlatList
          data={data}
          extraData={[isAdsLoading]}
          keyExtractor={item => item._id}
          renderItem={this.renderJobCard}
          ListHeaderComponent={
            <SliderAdvertising isLoading={isAdsLoading} onShowAd={onShowAd} />
          }
          refreshing={isRequest}
          onRefresh={this.handleUpdateTrackJobs}
        />
      </Wrapper>
    )
  }
}

Track.propTypes = {
  navigate: PropTypes.object,
  getError: PropTypes.func,
  jobs: PropTypes.array,
  onLoadTrackJobs: PropTypes.func,
  onSubscribeTrack: PropTypes.func,
  onStartTracking: PropTypes.func,
  isAdsLoading: PropTypes.bool,
  onShowAd: PropTypes.func,
}

export default Track
