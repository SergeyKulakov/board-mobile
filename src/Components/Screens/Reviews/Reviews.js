import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as routes from 'Constants/routes'

import { getShortUserName } from 'Helpers/user'

import { ReviewProfile, ReviewCard } from 'Components/Blocks'
import { Header } from './innerBlocks'
import {
  Container,
  Content,
  ReviewCardWrapper,
  ReviewProfileWrapper,
} from './style'

import mockData from './mock'

class Reviews extends PureComponent {
  state = {
    isRefreshing: false,
    isProfileLoad: true,
    popupOpenedId: null,
  }

  componentDidMount() {
    this.handleUpdateData()
  }

  updateReviews = () => {
    const { userId, onLoadReviews, onShowPuck, getError } = this.props

    this.setState({ isRefreshing: true })
    onLoadReviews(userId, ({ error }) => {
      this.setState({ isRefreshing: false }, () => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        }
      })
    })
  }

  loadProfile = () => {
    const { onLoadProfile, userId, onShowPuck, getError, navigate } = this.props

    this.setState({ isProfileLoad: true }, () => {
      onLoadProfile(userId, ({ error }) => {
        this.setState({ isProfileLoad: false }, () => {
          if (error) {
            onShowPuck({
              type: 'error',
              message: getError(error),
              callback: navigate.pop,
            })
          }
        })
      })
    })
  }

  handleUpdateData = () => {
    this.loadProfile()
    this.updateReviews()
  }

  handleDelete = review => {
    const { onDeleteReview, onShowPuck, getError } = this.props

    this.setState({ popupOpenedId: null }, () => {
      onDeleteReview(review._id, ({ error }) => {
        if (error) {
          onShowPuck({
            type: 'error',
            message: getError(error),
          })
        } else onShowPuck()
      })
    })
  }

  handleEdit = review => {
    const { navigate } = this.props

    this.setState({ popupOpenedId: null }, () => {
      navigate.push(routes.ratingReview, { review })
    })
  }

  handleOpenPopup = reviewId => this.setState({ popupOpenedId: reviewId })

  handleClosePopup = () => this.setState({ popupOpenedId: null })

  renderReviewCard = ({ item }) => {
    const { user } = this.props
    const { popupOpenedId } = this.state

    return (
      <ReviewCardWrapper>
        <ReviewCard
          comment={item.comment}
          rate={item.rate}
          author={item.author}
          createdAt={item.createdAt}
          disabledActions={_.get(item, 'author.username') !== user.username}
          onDelete={() => this.handleDelete(item)}
          onEdit={() => this.handleEdit(item)}
          onOpenPopup={() => this.handleOpenPopup(item._id)}
          isOpenPopup={popupOpenedId === item._id}
          isPopupEnabled={_.get(item, 'author.username') === user.username}
          onClosePopup={this.handleClosePopup}
        />
      </ReviewCardWrapper>
    )
  }

  renderProfile = () => {
    const { profile, reviews } = this.props
    const { isProfileLoad } = this.state

    if (isProfileLoad || _.isEmpty(profile)) return null

    return (
      <ReviewProfileWrapper>
        <ReviewProfile
          avatar={profile.avatarURL}
          userId={profile.username}
          userName={getShortUserName(
            profile.given_name,
            profile.family_name,
            profile.username,
          )}
          rate={Number(profile.rate)}
          reviewsCount={String(reviews.length)}
        />
      </ReviewProfileWrapper>
    )
  }

  render() {
    const { navigate, reviews } = this.props
    const { isRefreshing, isProfileLoad, popupOpenedId } = this.state

    return (
      <Container>
        <Header
          onHamburgerClick={navigate.showSidebar}
          onBackClick={navigate.pop}
        />
        <Content
          data={reviews}
          keyExtractor={item => item._id}
          ListHeaderComponent={this.renderProfile}
          extraData={[isProfileLoad, popupOpenedId]}
          renderItem={this.renderReviewCard}
          refreshing={isRefreshing}
          onRefresh={this.handleUpdateData}
        />
      </Container>
    )
  }
}

Reviews.propTypes = {
  navigate: PropTypes.object,
  reviews: PropTypes.array,
  profile: PropTypes.object,
  user: PropTypes.object,
  onLoadReviews: PropTypes.func,
  t: PropTypes.func,
  getError: PropTypes.func,
  onShowPuck: PropTypes.func,
  userId: PropTypes.string,
  onDeleteReview: PropTypes.func,
  onLoadProfile: PropTypes.func,
}

Reviews.defaultProps = {
  reviews: mockData,
}

export default Reviews
