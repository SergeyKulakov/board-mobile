import memoize from 'memoize-one'
import _ from 'lodash'

export const getIsAllJobsHired = memoize(
  (jobs = [], disabledJobs, username) => {
    if (_.isEmpty(jobs)) return false
    const hiredJobs = jobs.filter(el =>
      el.requests.some(item => item.doer === username),
    )

    return hiredJobs.length + disabledJobs.length === jobs.length
  },
)
