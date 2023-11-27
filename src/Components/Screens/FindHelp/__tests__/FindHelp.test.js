import React from 'react'
import { shallow } from 'enzyme'
import * as routes from 'Constants/routes'

import 'jest-styled-components'

import Component from '../FindHelp'

describe('FindHelp', () => {
  const defaultProps = {
    componentId: 'findHelp',
    navigate: {
      showMessage: () => null,
      push: () => null,
      showModal: () => null,
      pop: () => null,
      showSidebar: () => null,
    },
    isEndList: false,
    filters: {},
    page: 0,
    user: {
      defaultRadius: '10',
    },
    serviceProviders: [],
    onLoadList: () => null,
    onAddFavorite: () => null,
    onDeleteFavorite: () => null,
    onRemoveServiceProvider: () => null,
    onSendRequest: () => null,
  }
  const serverError = {
    payload: {
      code: 'code',
    },
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const withMapView = shallow(<Component {...defaultProps} />)
    withMapView.setState({ tabIndex: 1 })

    const renderMapServiceProviderCard = wrapper
      .instance()
      .renderMapServiceProviderCard({
        item: {
          username: 'username',
          picsOfWork: [],
          _id: 'username',
        },
      })

    expect([
      wrapper,
      withMapView,
      renderMapServiceProviderCard,
    ]).toMatchSnapshot()
  })

  it('reload data', () => {
    const props = {
      ...defaultProps,
      onLoadList: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onLoadList).toHaveBeenCalledTimes(1)

    wrapper.setState({
      loading: {
        favouriteId: false,
        serviceProviders: false,
      },
    })

    wrapper
      .find('ServiceProvidersList')
      .props()
      .onRefresh()

    expect(props.onLoadList).toHaveBeenCalledTimes(2)
  })

  it('should show profile reviews', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.push).not.toHaveBeenCalled()

    const profile = {
      username: 'userId',
    }

    wrapper.instance().handleOpenReviews(profile)

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
    expect(props.navigate.push).toHaveBeenCalledWith(routes.reviews, {
      userId: 'userId',
    })
  })

  it('open sp profile', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.push).not.toHaveBeenCalled()

    const profile = {
      username: 'userId',
    }

    wrapper.instance().handleOpenServiceProvider(profile)

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
    expect(props.navigate.push).toHaveBeenCalledWith(
      routes.serviceProviderProfile,
      {
        userId: 'userId',
      },
    )
  })

  describe('search modal actions', () => {
    it('submit with keywords', done => {
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn((route, { onSubmit }) => {
            setTimeout(() => {
              onSubmit({ keywords: 'keywords' })
            }, 1000)
          }),
        },
        onLoadList: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({
        loading: {
          favouriteId: false,
          serviceProviders: false,
        },
      })

      wrapper.instance().handleOpenSearchModal()

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.onLoadList).toHaveBeenCalledTimes(2)
        done()
      }, 1100)
    })

    it('submit with service', done => {
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn((route, { onSubmit }) => {
            setTimeout(() => {
              onSubmit({
                service: {
                  _id: '12',
                  title: 'title',
                },
              })
            }, 1000)
          }),
        },
        onLoadList: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({
        loading: {
          favouriteId: false,
          serviceProviders: false,
        },
      })

      wrapper.instance().handleOpenSearchModal()

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.onLoadList).toHaveBeenCalledTimes(2)
        done()
      }, 1100)
    })
  })

  describe('remove profile card', () => {
    it('from list', () => {
      const props = {
        ...defaultProps,
        onRemoveServiceProvider: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onRemoveServiceProvider).not.toHaveBeenCalled()

      wrapper.setState({ tabIndex: 0 })

      const profile = {
        username: 'userId',
      }

      wrapper.instance().handleRemoveServiceProvider(profile)

      expect(props.onRemoveServiceProvider).toHaveBeenCalledTimes(1)
      expect(props.onRemoveServiceProvider).toHaveBeenCalledWith('userId')
    })

    it('from map', () => {
      const mapRef = {
        current: {
          hideSlider: jest.fn(),
        },
      }
      const props = {
        ...defaultProps,
        onRemoveServiceProvider: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().map = mapRef

      expect(props.onRemoveServiceProvider).not.toHaveBeenCalled()

      wrapper.setState({ tabIndex: 1 })

      const profile = {
        username: 'userId',
      }

      wrapper.instance().handleRemoveServiceProvider(profile)

      expect(props.onRemoveServiceProvider).not.toHaveBeenCalled()
      expect(mapRef.current.hideSlider).toHaveBeenCalledTimes(1)
    })
  })

  it('sort modal submit', done => {
    const props = {
      ...defaultProps,
      navigate: {
        showModal: jest.fn((route, { onSubmit }) => {
          setTimeout(() => {
            onSubmit()
          }, 1000)
        }),
      },
      onLoadList: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleSortClick()

    wrapper.setState({
      loading: {
        favouriteId: false,
        serviceProviders: false,
      },
    })

    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
    expect(props.onLoadList).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(props.onLoadList).toHaveBeenCalledTimes(2)
      done()
    }, 1100)
  })

  it('pagination', () => {
    const props = {
      ...defaultProps,
      page: 0,
      onLoadList: jest.fn(),
      isEndList: false,
      filters: {},
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.setState({
      loading: {
        favouriteId: false,
        serviceProviders: false,
      },
    })

    wrapper.instance().handleLoadServiceProviders = jest.fn()

    wrapper.instance().handleLoadMore()

    expect(wrapper.instance().handleLoadServiceProviders).toHaveBeenCalledTimes(
      1,
    )
    expect(wrapper.instance().handleLoadServiceProviders).toHaveBeenCalledWith(
      {},
      1,
    )
  })

  it('open images modal', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        showModal: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    const args = [['sdasd', '13132r qef', '2131sda'], 1]

    wrapper.instance().handleOpenImages(...args)

    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
    expect(props.navigate.showModal).toHaveBeenCalledWith(routes.imagesSlider, {
      data: args[0],
      activeIndex: 1,
    })
  })

  describe('call favourite actions', () => {
    const getProps = isSuccessful => ({
      ...defaultProps,
      onAddFavorite: jest.fn((userId, callback) => {
        setTimeout(() => {
          callback({ error: isSuccessful ? undefined : serverError })
        }, 1000)
      }),
      onDeleteFavorite: jest.fn((favouriteId, callback) => {
        setTimeout(() => {
          callback({ error: isSuccessful ? undefined : serverError })
        }, 1000)
      }),
      getError: jest.fn(),
      onShowPuck: jest.fn(),
    })

    describe('add', () => {
      it('successful', done => {
        const props = getProps(true)

        const wrapper = shallow(<Component {...props} />)

        expect(props.onAddFavorite).not.toHaveBeenCalled()
        expect(props.onDeleteFavorite).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        expect(wrapper.state('loading').favouriteId).toBe(null)

        const provider = {
          username: 'username',
          _id: 'userId',
        }

        wrapper.instance().handleFavouriteClick(provider)

        expect(wrapper.state('loading').favouriteId).toBe(provider._id)
        expect(props.onDeleteFavorite).not.toHaveBeenCalled()
        expect(props.onAddFavorite).toHaveBeenCalledTimes(1)

        setTimeout(() => {
          expect(wrapper.state('loading').favouriteId).toBe(null)
          expect(props.getError).not.toHaveBeenCalled()
          expect(props.onShowPuck).not.toHaveBeenCalled()
          done()
        }, 1100)
      })

      it('failure', done => {
        const props = getProps(false)

        const wrapper = shallow(<Component {...props} />)

        expect(props.onAddFavorite).not.toHaveBeenCalled()
        expect(props.onDeleteFavorite).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        expect(wrapper.state('loading').favouriteId).toBe(null)

        const provider = {
          username: 'username',
          _id: 'userId',
        }

        wrapper.instance().handleFavouriteClick(provider)

        expect(wrapper.state('loading').favouriteId).toBe(provider._id)
        expect(props.onDeleteFavorite).not.toHaveBeenCalled()
        expect(props.onAddFavorite).toHaveBeenCalledTimes(1)

        setTimeout(() => {
          expect(wrapper.state('loading').favouriteId).toBe(null)
          expect(props.getError).toHaveBeenCalledTimes(1)
          expect(props.getError).toHaveBeenCalledWith(serverError)
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      })
    })

    describe('remove', () => {
      it('successful', done => {
        const props = getProps(true)

        const wrapper = shallow(<Component {...props} />)

        expect(props.onAddFavorite).not.toHaveBeenCalled()
        expect(props.onDeleteFavorite).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        expect(wrapper.state('loading').favouriteId).toBe(null)

        const provider = {
          username: 'username',
          _id: 'userId',
          favouriteId: '12341ewqedsae',
        }

        wrapper.instance().handleFavouriteClick(provider)

        expect(wrapper.state('loading').favouriteId).toBe(provider._id)
        expect(props.onDeleteFavorite).toHaveBeenCalledTimes(1)
        expect(props.onAddFavorite).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(wrapper.state('loading').favouriteId).toBe(null)
          expect(props.getError).not.toHaveBeenCalled()
          expect(props.onShowPuck).not.toHaveBeenCalled()
          done()
        }, 1100)
      })

      it('failure', done => {
        const props = getProps(false)

        const wrapper = shallow(<Component {...props} />)

        expect(props.onAddFavorite).not.toHaveBeenCalled()
        expect(props.onDeleteFavorite).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        expect(wrapper.state('loading').favouriteId).toBe(null)

        const provider = {
          username: 'username',
          _id: 'userId',
          favouriteId: '12341ewqedsae',
        }

        wrapper.instance().handleFavouriteClick(provider)

        expect(wrapper.state('loading').favouriteId).toBe(provider._id)
        expect(props.onDeleteFavorite).toHaveBeenCalledTimes(1)
        expect(props.onAddFavorite).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(wrapper.state('loading').favouriteId).toBe(null)
          expect(props.getError).toHaveBeenCalledTimes(1)
          expect(props.getError).toHaveBeenCalledWith(serverError)
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      })
    })
  })

  it('submit set filters', done => {
    const nextFilters = {
      address: 'address',
    }
    const props = {
      ...defaultProps,
      filters: {},
      navigate: {
        push: jest.fn((route, { onSubmit }) => {
          setTimeout(() => {
            onSubmit(nextFilters)
          }, 1000)
        }),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleLoadServiceProviders = jest.fn()

    wrapper.instance().handleOpenFilter()

    expect(props.navigate.push).toHaveBeenCalled()

    setTimeout(() => {
      expect(
        wrapper.instance().handleLoadServiceProviders,
      ).toHaveBeenCalledTimes(1)
      expect(
        wrapper.instance().handleLoadServiceProviders,
      ).toHaveBeenCalledWith(nextFilters, 0, true)
      done()
    }, 1100)
  })

  describe('load sp list', () => {
    const getProps = isSuccessful => ({
      ...defaultProps,
      onLoadList: jest.fn(({ callback }) => {
        setTimeout(() => {
          callback({ error: isSuccessful ? undefined : serverError })
        }, 1000)
      }),
      onShowPuck: jest.fn(),
      getError: jest.fn(),
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().handleLoadServiceProviders()

      expect(wrapper.state('loading')).toStrictEqual({
        serviceProviders: true,
        favouriteId: null,
        pagination: false,
      })

      expect(props.onLoadList).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('loading')).toStrictEqual({
          serviceProviders: false,
          favouriteId: null,
          pagination: false,
        })
        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().handleLoadServiceProviders()

      expect(wrapper.state('loading')).toStrictEqual({
        serviceProviders: true,
        favouriteId: null,
        pagination: false,
      })

      expect(props.onLoadList).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('loading')).toStrictEqual({
          serviceProviders: false,
          favouriteId: null,
          pagination: false,
        })
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith(serverError)
        done()
      }, 1100)
    })
  })
})
