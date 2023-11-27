import {
  getCurrentService,
  filteredServices,
  getServiceMoreString,
  getServiceTitle,
  sortedService,
} from '../services'

describe('Helpers/services', () => {
  it('getCurrentService', () => {
    const services = [
      {
        _id: 'ew123e',
        subservices: [
          {
            _id: '3141dsdqw',
          },
          {
            _id: '3141dsd32w',
          },
        ],
      },
      {
        _id: 'feqi32p4',
        subservices: [
          {
            _id: '132ededq',
          },
          {
            _id: 'vr313r',
          },
        ],
      },
    ]
    const serviceId = 'ew123e'
    const categoryId = '3141dsdqw'

    const result = getCurrentService(services, serviceId, categoryId)

    expect(result).toStrictEqual({
      _id: 'ew123e',
      subservices: [
        {
          _id: '3141dsdqw',
        },
        {
          _id: '3141dsd32w',
        },
      ],
    })
  })

  it('filteredServices', () => {
    const items = [
      {
        title: 'Lightning',
      },
      {
        title: 'Landscaping',
      },
    ]
    const value = 'lig'

    const result = filteredServices(items, value)

    expect(result).toStrictEqual([
      {
        title: 'Lightning',
      },
    ])
  })

  describe('getServiceMoreString', () => {
    it('one service', () => {
      const services = [
        {
          title: 'Landscaping',
        },
      ]

      const result = getServiceMoreString(services)

      expect(result).toStrictEqual('Landscaping')
    })

    it('many services', () => {
      const services = [
        {
          title: 'Landscaping',
        },
        {
          title: 'Lightning',
        },
        {
          title: 'Makeup',
        },
      ]

      const result = getServiceMoreString(services)

      expect(result).toStrictEqual('Landscaping & 2 More')
    })

    it('invalid request', () => {
      const result = getServiceMoreString([])

      expect(result).toStrictEqual('')
    })
  })

  describe('getServiceTitle', () => {
    it('successful', () => {
      const title = 'Landscaping'

      const result = getServiceTitle(title)

      expect(result).toStrictEqual('Landscaping')
    })

    it('failure', () => {
      const title = 2

      const result = getServiceTitle(title)

      expect(result).toStrictEqual('')
    })
  })

  it('sortedService', () => {
    const services = [
      {
        title: 'title1',
        _id: '1234wqwe',
        popularity: 2,
      },
      {
        title: 'title2',
        _id: '123423dw',
        popularity: 1,
      },
      {
        title: 'title3',
        _id: 'sqdlkf23i',
        popularity: 3,
      },
    ]

    const result = sortedService(services)

    expect(result).toStrictEqual([
      {
        title: 'title2',
        _id: '123423dw',
        popularity: 1,
      },
      {
        title: 'title1',
        _id: '1234wqwe',
        popularity: 2,
      },
      {
        title: 'title3',
        _id: 'sqdlkf23i',
        popularity: 3,
      },
    ])
  })
})
