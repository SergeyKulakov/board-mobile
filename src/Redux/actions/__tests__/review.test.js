import {
  loadReviewedSp,
  createSPReview,
  deleteReview,
  loadUserReviews,
  updateReview,
} from '../review'

describe('actions/review', () => {
  const callback = () => null
  it('loadReviewedSp', () => {
    const args = ['userId', callback]
    const result = loadReviewedSp(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/service-provider/userId`,
        types: {
          REQUEST: 'review/LOAD_SP.REQUEST',
          SUCCESS: 'review/LOAD_SP.SUCCESS',
          FAILURE: 'review/LOAD_SP.FAILURE',
        },
        method: 'GET',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('createSPReview', () => {
    const args = [
      {
        jobId: 'jobId',
        reviewedUserId: 'reviewedUserId',
        rate: 3,
        comment: 'comment',
      },
      callback,
    ]
    const result = createSPReview(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/review',
        types: {
          REQUEST: 'review/CREATE.REQUEST',
          SUCCESS: 'review/CREATE.SUCCESS',
          FAILURE: 'review/CREATE.FAILURE',
        },
        method: 'POST',
        query: {
          jobId: 'jobId',
          reviewedUserId: 'reviewedUserId',
          rate: 3,
          comment: 'comment',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('deleteReview', () => {
    const args = ['reviewId', callback]
    const result = deleteReview(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/review/reviewId`,
        types: {
          REQUEST: 'review/DELETE.REQUEST',
          SUCCESS: 'review/DELETE.SUCCESS',
          FAILURE: 'review/DELETE.FAILURE',
        },
        method: 'DELETE',
        meta: {
          reviewId: 'reviewId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadUserReviews', () => {
    const args = ['userId', callback]
    const result = loadUserReviews(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/review/user/userId`,
        types: {
          REQUEST: 'review/LOAD_USER_REVIEWS.REQUEST',
          SUCCESS: 'review/LOAD_USER_REVIEWS.SUCCESS',
          FAILURE: 'review/LOAD_USER_REVIEWS.FAILURE',
        },
        method: 'GET',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('updateReview', () => {
    const args = [
      { reviewId: 'reviewId', comment: 'comment', rate: 1, jobId: 'jobId' },
      callback,
    ]
    const result = updateReview(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: `/review/reviewId`,
        types: {
          REQUEST: 'review/UPDATE.REQUEST',
          SUCCESS: 'review/UPDATE.SUCCESS',
          FAILURE: 'review/UPDATE.FAILURE',
        },
        method: 'PUT',
        meta: {
          reviewId: 'reviewId',
          comment: 'comment',
          rate: 1,
          jobId: 'jobId',
        },
        query: {
          comment: 'comment',
          rate: 1,
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
