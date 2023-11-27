import {
  getPeopleWhoApplied,
  getShortUserName,
  isMatchService,
  isSocialAccount,
  isUSA,
} from '../user'

describe('Helpers/user', () => {
  describe('getPeopleWhoApplied', () => {
    it('my job', () => {
      const job = {
        peopleWhoApplied: [
          {
            userId: 'userId',
          },
          {
            userId: 'userId1',
          },
        ],
        author: {
          username: 'userId',
        },
      }
      const username = 'userId'

      const result = getPeopleWhoApplied(job, username)

      expect(result).toStrictEqual([
        {
          userId: 'userId1',
        },
      ])
    })

    it('other job', () => {
      const job = {
        peopleWhoApplied: [
          {
            userId: 'userId',
          },
          {
            userId: 'userId1',
          },
        ],
        author: {
          username: 'userId3',
        },
      }
      const username = 'userId3'

      const result = getPeopleWhoApplied(job, username)

      expect(result).toStrictEqual(job.peopleWhoApplied)
    })
  })

  describe('getShortUserName', () => {
    it('successful', () => {
      const givenName = 'givenName'
      const familyName = 'familyName'
      const text = 'text'

      const result = getShortUserName(givenName, familyName, text)

      expect(result).toBe('givenName F.')
    })

    it('invalid request', () => {
      const givenName = 'givenName'
      const familyName = 2
      const text = 'text'

      const result = getShortUserName(givenName, familyName, text)

      expect(result).toBe('text')
    })
  })

  describe('isMatchService', () => {
    it('should return true', () => {
      const job = {
        service: {
          _id: 'dsw421',
        },
      }

      const user = {
        services: [
          {
            _id: '134qe',
          },
          {
            _id: 'dsw421',
          },
        ],
      }

      const result = isMatchService(job, user)

      expect(result).toBe(true)
    })

    it('should return false', () => {
      const job = {
        service: {
          _id: 'dsw421',
        },
      }

      const user = {
        services: [],
      }

      const result = isMatchService(job, user)

      expect(result).toBe(false)
    })
  })

  it('isSocialAccount', () => {
    expect(isSocialAccount('google_3204193roje')).toBe(true)
    expect(isSocialAccount('facebook_3204193roje')).toBe(true)
    expect(isSocialAccount('linkedin_3204193roje')).toBe(true)
    expect(isSocialAccount('sdmnwqer3204193roje')).toBe(false)
    expect(isSocialAccount('fqpoup3oi2jdfseqwe2')).toBe(false)
  })

  it('isUSA', () => {
    expect(isUSA({ country: 'USA' })).toBe(false)
    expect(isUSA({ country: 'United States' })).toBe(true)
  })
})
