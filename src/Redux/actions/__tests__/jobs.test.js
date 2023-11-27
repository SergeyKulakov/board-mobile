import { getParamsWithUnits } from 'Helpers/redux/user'
import { JOBS_ELEMENTS_PER_PAGE } from 'Constants/pagination'
import { checkInvalidJob } from 'Helpers/jobs'
import {
  loadFavoriteJobs,
  addFavoriteJob,
  deleteFavoriteJob,
  invalidJob,
  loadJobsList,
  loadSpecificJob,
  markAsJob,
  postUserVacancy,
  removeJob,
} from '../jobs'

describe('actions/jobs', () => {
  const callback = () => null

  it('loadFavoriteJobs', () => {
    const args = [callback]
    const result = loadFavoriteJobs(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/favourites/job/list',
        types: {
          REQUEST: 'jobs/LOAD_FAVORITE.REQUEST',
          SUCCESS: 'jobs/LOAD_FAVORITE.SUCCESS',
          FAILURE: 'jobs/LOAD_FAVORITE.FAILURE',
        },
        params: {
          elements_per_page: 1000,
          no_geolocation_filter: true,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('addFavoriteJob', () => {
    const args = ['jobId', callback]
    const result = addFavoriteJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/favourites/job',
        types: {
          REQUEST: 'jobs/ADD_FAVORITE.REQUEST',
          SUCCESS: 'jobs/ADD_FAVORITE.SUCCESS',
          FAILURE: 'jobs/ADD_FAVORITE.FAILURE',
        },
        method: 'POST',
        query: {
          jobId: 'jobId',
        },
        meta: {
          id: 'jobId',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('deleteFavoriteJob', () => {
    const args = ['id', callback]
    const result = deleteFavoriteJob(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/favourites/job',
        types: {
          REQUEST: 'jobs/DELETE_FAVORITE.REQUEST',
          SUCCESS: 'jobs/DELETE_FAVORITE.SUCCESS',
          FAILURE: 'jobs/DELETE_FAVORITE.FAILURE',
        },
        method: 'DELETE',
        query: {
          favouriteJobId: 'id',
        },
        meta: {
          id: 'id',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('invalidJob', () => {
    const args = ['jobId']
    const result = invalidJob(...args)

    expect(result).toStrictEqual({
      type: 'jobs/INVALID_JOB',
      payload: {
        jobId: 'jobId',
      },
    })
  })

  it('loadJobsList', () => {
    const args = [
      {
        filters: {
          filters: 'filters',
        },
        callback,
        isPagination: false,
        isClearRemoved: false,
        savedFilters: {},
      },
    ]
    const result = loadJobsList(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/jobs',
        types: {
          REQUEST: 'jobs/LOAD_LIST.REQUEST',
          SUCCESS: 'jobs/LOAD_LIST.SUCCESS',
          FAILURE: 'jobs/LOAD_LIST.FAILURE',
        },
        method: 'GET',
        params: {
          filters: 'filters',
          elements_per_page: JOBS_ELEMENTS_PER_PAGE,
        },
        meta: {
          isPagination: false,
          filters: {},
          isClearRemoved: false,
        },
        preFormat: getParamsWithUnits,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadSpecificJob', () => {
    const args = ['jobId', callback]
    const result = loadSpecificJob(...args)

    expect(result).toEqual({
      fields: {
        endpoint: `/job/jobId`,
        types: {
          REQUEST: 'jobs/LOAD_SPECIFIC_VACANCY.REQUEST',
          SUCCESS: 'jobs/LOAD_SPECIFIC_VACANCY.SUCCESS',
          FAILURE: 'jobs/LOAD_SPECIFIC_VACANCY.FAILURE',
        },
        preFormat: getParamsWithUnits,
        postFormat: checkInvalidJob,
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('markAsJob', () => {
    const args = ['jobId', callback]
    const result = markAsJob(...args)

    expect(result).toEqual({
      fields: {
        endpoint: `/jobs/jobId/complete`,
        types: {
          REQUEST: 'jobs/MARK_AS.REQUEST',
          SUCCESS: 'jobs/MARK_AS.SUCCESS',
          FAILURE: 'jobs/MARK_AS.FAILURE',
        },
        method: 'POST',
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('postUserVacancy', () => {
    const args = [
      { title: 'jobTitle', _id: 'jobId', dateBefore: 'dateBefore' },
      callback,
    ]
    const result = postUserVacancy(...args)

    expect(result).toEqual({
      fields: {
        endpoint: '/job',
        types: {
          REQUEST: 'jobs/POST_USER_VACANCY.REQUEST',
          SUCCESS: 'jobs/POST_USER_VACANCY.SUCCESS',
          FAILURE: 'jobs/POST_USER_VACANCY.FAILURE',
        },
        method: 'POST',
        query: {
          ...args[0],
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('removeJob', () => {
    const args = ['jobId']
    const result = removeJob(...args)

    expect(result).toEqual({
      id: 'jobId',
      type: 'jobs/REMOVE',
    })
  })
})
