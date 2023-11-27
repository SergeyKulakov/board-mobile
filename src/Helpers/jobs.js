import { getUser } from 'Redux/selectors/user'
import { isUSA } from 'Helpers/user'
import statuses from 'Constants/statuses'

export const checkInvalidJob = job =>
  job.author === null
    ? {
        error: {
          code: 'jobLongerAvailable',
          data: {
            jobId: job._id,
          },
        },
      }
    : job

export const getPostedJobRequestFormat = ({ params }, store) => {
  const user = getUser(store.getState())

  return {
    params: {
      ...params,
      author: user.username,
      length_units: isUSA(user) ? 'mile' : 'kilometre',
    },
  }
}

export const filteredBookedJobs = data =>
  data.list.filter(el => el.jobStatus === statuses.booked)
