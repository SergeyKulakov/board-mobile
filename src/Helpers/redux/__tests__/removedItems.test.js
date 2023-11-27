import {
  filteredRemovedJobs,
  filteredRemovedServiceProviders,
} from '../removedItems'

describe('removedItems', () => {
  it('filteredRemovedJobs', () => {
    const jobs = new Array(10).fill(true).map((_, index) => ({
      _id: index,
      title: `job-${index}`,
    }))

    const removedIds = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const result = filteredRemovedJobs(jobs, removedIds)

    expect(result).toStrictEqual([
      {
        _id: 9,
        title: `job-9`,
      },
    ])
  })

  it('filteredRemovedServiceProviders', () => {
    const users = new Array(10).fill(true).map((_, index) => ({
      _id: index,
      username: `user-${index}`,
    }))

    const removedIds = [1, 2, 3, 4, 5, 6, 7, 8]

    const result = filteredRemovedServiceProviders(users, removedIds)

    expect(result).toStrictEqual([
      {
        _id: 0,
        username: `user-0`,
      },
      {
        _id: 9,
        username: `user-9`,
      },
    ])
  })

  it('not valid call', () => {
    const users = new Array(10).fill(true).map((_, index) => ({
      _id: index,
      username: `user-${index}`,
    }))

    const jobs = new Array(10).fill(true).map((_, index) => ({
      _id: index,
      title: `job-${index}`,
    }))

    const jobsResult = filteredRemovedJobs(jobs, 'removedIds')

    const usersResult = filteredRemovedServiceProviders(users, 'removedIds')

    expect(jobsResult).toStrictEqual([])
    expect(usersResult).toStrictEqual([])
  })
})
