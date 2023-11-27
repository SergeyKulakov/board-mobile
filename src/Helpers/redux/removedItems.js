import _ from 'lodash'

export const filteredRemovedJobs = (jobs, removedIds) => {
  if (!_.isArray(jobs) || !_.isArray(removedIds)) return []

  return jobs.filter(el => removedIds.indexOf(el._id) === -1)
}

export const filteredRemovedServiceProviders = (data, removedIds) => {
  if (!_.isArray(data) || !_.isArray(removedIds)) return []

  return data.filter(el => removedIds.indexOf(el._id) === -1)
}
