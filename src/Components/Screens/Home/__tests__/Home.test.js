import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'
import * as routes from 'Constants/routes'

import 'jest-styled-components'

import Component from '../Home'

jest.mock('../innerBlocks', () => ({
  Header: () => null,
  Wrapper: () => null,
}))

describe('Home', () => {
  const defaultProps = {
    user: {
      username: 'username',
      avatarURL: 'avatar',
      email_verified: 'true',
      phone_number_verified: 'true',
    },
    isRequest: false,
    popularCategories: Array(5),
    popularServiceProviders: Array(5),
    navigate: {
      push: () => null,
      showSidebar: () => null,
      showMessage: () => null,
      showModal: () => null,
    },
    onLoadPopularServiceProviders: () => null,
    onLoadPopularCategories: () => null,
    onLoadServiceProviderProfile: () => null,
    serviceProviderProfile: {
      username: 'username',
    },
    onLoadServices: () => null,
    onLoadUserData: () => null,
    onLoadNotifications: () => null,
    t: text => text,
    onShowPuck: () => null,
    onSetupSocket: () => null,
    isSocketConnected: true,
    onShowAd: () => null,
    getError: () => null,
    isAdsLoading: false,
    points: 10,
    componentId: 'component1',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderContent = wrapper.instance()._renderContent()

    expect([wrapper, renderContent]).toMatchSnapshot()
  })

  it('call initial requests', done => {
    const props = {
      ...defaultProps,
      onLoadServices: jest.fn(),
      onLoadUserData: jest.fn(callback => {
        setTimeout(() => {
          callback()
        }, 1000)
      }),
      onSetupSocket: jest.fn(),
      isSocketConnected: false,
      onLoadPopularServiceProviders: jest.fn(),
      onLoadPopularCategories: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)
    wrapper.instance().showVerifyInfo = jest.fn()

    expect(props.onLoadUserData).toHaveBeenCalledTimes(1)
    expect(props.onLoadPopularCategories).toHaveBeenCalledTimes(1)
    expect(props.onLoadServices).toHaveBeenCalledTimes(1)
    expect(props.onSetupSocket).not.toHaveBeenCalled()
    expect(props.onLoadPopularServiceProviders).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(props.onSetupSocket).toHaveBeenCalledTimes(1)
      expect(props.onLoadPopularServiceProviders).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().showVerifyInfo).toHaveBeenCalledTimes(1)
      done()
    }, 1100)
  })

  describe('show verify info', () => {
    describe('should show', () => {
      it('phone number', done => {
        const props = {
          ...defaultProps,
          onLoadUserData: jest.fn(callback => {
            setTimeout(() => {
              callback()
            }, 1000)
          }),
          user: {
            ...defaultProps.user,
            phone_number_verified: 'false',
          },
          onShowPuck: jest.fn(),
        }

        shallow(<Component {...props} />)

        expect(props.onShowPuck).not.toHaveBeenCalled()
        setTimeout(() => {
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1400)
      })

      it('email', done => {
        const props = {
          ...defaultProps,
          onLoadUserData: jest.fn(callback => {
            setTimeout(() => {
              callback()
            }, 1000)
          }),
          user: {
            ...defaultProps.user,
            email_verified: 'false',
          },
          onShowPuck: jest.fn(),
        }

        shallow(<Component {...props} />)

        expect(props.onShowPuck).not.toHaveBeenCalled()
        setTimeout(() => {
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1400)
      })
    })

    it("shouldn't show", done => {
      const props = {
        ...defaultProps,
        onLoadUserData: jest.fn(callback => {
          setTimeout(() => {
            callback()
          }, 1000)
        }),
        onShowPuck: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.onShowPuck).not.toHaveBeenCalled()
      setTimeout(() => {
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        done()
      }, 1400)
    })
  })

  it('refresh all data', () => {
    const props = {
      ...defaultProps,
      onLoadUserData: jest.fn(),
      onLoadPopularCategories: jest.fn(),
      onLoadPopularServiceProviders: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID`SectionList`)
      .props()
      .onRefresh()

    expect(props.onLoadUserData).toHaveBeenCalledTimes(2)
    expect(props.onLoadPopularCategories).toHaveBeenCalledTimes(2)
    expect(props.onLoadPopularServiceProviders).toHaveBeenCalledTimes(1)
  })

  it('open popular sp profile', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.push).not.toHaveBeenCalled()

    const args = {
      username: 'user1',
    }

    wrapper.instance().handleClickServiceProvider(args)

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
    expect(props.navigate.push).toHaveBeenCalledWith(
      routes.serviceProviderProfile,
      { userId: args.username },
    )
  })

  it('open filter modal', done => {
    const filters = 'filters'
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn((route, { onSubmit }) => {
          setTimeout(() => {
            onSubmit(filters)
          }, 1000)
        }),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.push).not.toHaveBeenCalled()

    wrapper.instance().handleOpenServices()

    expect(props.navigate.push).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(props.navigate.push).toHaveBeenCalledTimes(2)
      done()
    }, 1100)
  })

  it('open subscription screen', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find('Header')
      .props()
      .onPointsClick()

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
    expect(props.navigate.push).toHaveBeenCalledWith(routes.subscriptions)
  })

  it('open find jobs with service', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    const args = 'category'

    wrapper.instance().handleClickService(args)

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
    expect(props.navigate.push).toHaveBeenCalledWith(routes.findJobs, {
      category: args,
    })
  })
})
