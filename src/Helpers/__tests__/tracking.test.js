import { isResolveTracking } from '../tracking'

describe('Helpers > isResolveTracking', () => {
  it('should return true', () => {
    const job = {
      startDate: new Date().valueOf(),
    }

    const user = {
      isPremium: false,
    }

    const result = isResolveTracking(job, user)

    expect(result).toBe(true)
  })

  it('should return false', () => {
    const job = {
      startDate: new Date(new Date().getMinutes() + 50).valueOf(),
    }

    const user = {
      isPremium: false,
    }

    const result = isResolveTracking(job, user)

    expect(result).toBe(false)
  })
})
