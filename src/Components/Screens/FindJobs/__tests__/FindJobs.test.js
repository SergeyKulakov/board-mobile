import React from 'react'
import { shallow } from 'enzyme'
import * as routes from 'Constants/routes'

import 'jest-styled-components'

import Component from '../FindJobs'

describe('FindJobs', () => {
  const defaultProps = {
    navigate: {
      push: () => null,
      pop: () => null,
      showSidebar: () => null,
    },
    onLoadJobsList: () => null,
    jobsPage: 0,
    jobsFilters: {},
    loadingJobId: null,
    jobsList: [],
    user: {
      username: 'userId',
      geolocation: '12.12413/32.3214123',
    },
    isEndJobsList: false,
    specificJob: null,
    onFavouriteClick: () => null,
    onLoadSpecificJob: () => null,
    onRemoveVacancy: () => null,
    loadApplyJobId: null,
    onApplyJob: () => null,
    defaultFilters: null,
    onJobShare: () => null,
    onShowPuck: () => null,
    getError: () => 'error',
    author: undefined,
    onSendError: () => null,
    isAdsLoading: false,
    componentId: 'componentId',
    t: text => text,
  }

  const serverError = {
    payload: {
      code: 'code',
    },
  }

  it('render snapshot', () => {
    const listWrapper = shallow(<Component {...defaultProps} />)

    const mapWrapper = shallow(<Component {...defaultProps} />)
    mapWrapper.setState(prevState => ({
      tabsState: { ...prevState.tabsState, index: 1 },
    }))

    const mapCardWrapper = mapWrapper.instance().renderMapCard({
      item: {
        author: 'author',
        _id: 'userId',
      },
    })

    expect([listWrapper, mapWrapper, mapCardWrapper]).toMatchSnapshot()
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
        onLoadJobsList: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({
        loading: {
          pagination: false,
          jobsList: false,
        },
      })

      wrapper.instance().handleOpenSearchModal()

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.onLoadJobsList).toHaveBeenCalledTimes(2)
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
        onLoadJobsList: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({
        loading: {
          pagination: false,
          jobsList: false,
        },
      })

      wrapper.instance().handleOpenSearchModal()

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.onLoadJobsList).toHaveBeenCalledTimes(2)
        done()
      }, 1100)
    })
  })

  it('pagination', () => {
    const props = {
      ...defaultProps,
      page: 0,
      onLoadJobsList: () => null,
      isEndList: false,
      filters: {},
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.setState({
      loading: {
        pagination: false,
        jobsList: false,
      },
    })

    wrapper.instance().handleLoadJobs = jest.fn()

    wrapper.instance().handleLoadMoreJobs()

    expect(wrapper.instance().handleLoadJobs).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleLoadJobs).toHaveBeenCalledWith({}, 1)
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
      onLoadJobsList: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleOpenSortModal()

    wrapper.setState({
      loading: {
        pagination: false,
        jobsList: false,
      },
    })

    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
    expect(props.onLoadJobsList).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(props.onLoadJobsList).toHaveBeenCalledTimes(2)
      done()
    }, 1100)
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

    wrapper.instance().handleLoadJobs = jest.fn()

    wrapper.instance().handleOpenFilter()

    expect(props.navigate.push).toHaveBeenCalled()

    setTimeout(() => {
      expect(wrapper.instance().handleLoadJobs).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().handleLoadJobs).toHaveBeenCalledWith(
        nextFilters,
        0,
        true,
      )
      done()
    }, 1100)
  })

  describe('load jobs list', () => {
    const getProps = isSuccessful => ({
      ...defaultProps,
      onLoadJobsList: jest.fn(({ callback }) => {
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

      wrapper.instance().handleLoadJobs()

      expect(wrapper.state('loading')).toStrictEqual({
        jobsList: true,
        pagination: false,
      })

      expect(props.onLoadJobsList).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('loading')).toStrictEqual({
          jobsList: false,
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

      wrapper.instance().handleLoadJobs()

      expect(wrapper.state('loading')).toStrictEqual({
        jobsList: true,
        pagination: false,
      })

      expect(props.onLoadJobsList).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('loading')).toStrictEqual({
          jobsList: false,
          pagination: false,
        })
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith(serverError)
        done()
      }, 1100)
    })
  })

  it('remove job card', () => {
    const props = {
      ...defaultProps,
      onRemoveVacancy: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onRemoveVacancy).not.toHaveBeenCalled()

    wrapper.setState({ tabIndex: 0 })

    const job = {
      _id: 'jobId',
    }

    wrapper.instance().handleRemoveVacancyClick(job)

    expect(props.onRemoveVacancy).toHaveBeenCalledTimes(1)
    expect(props.onRemoveVacancy).toHaveBeenCalledWith('jobId')
  })

  it('open job detail', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.push).not.toHaveBeenCalled()

    const job = {
      _id: 'jobId',
    }

    wrapper.instance().handleVacancyClick(job)

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
    expect(props.navigate.push).toHaveBeenCalledWith(routes.jobDescription, {
      jobId: 'jobId',
    })
  })

  it('call favourite action', () => {
    const props = {
      ...defaultProps,
      onFavouriteClick: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onFavouriteClick).not.toHaveBeenCalled()

    const job = {
      _id: 'jobId',
    }

    wrapper.instance().handleFavoriteClick(job)

    expect(props.onFavouriteClick).toHaveBeenCalledTimes(1)
    expect(props.onFavouriteClick).toHaveBeenCalledWith(job)
  })

  it('reload data', () => {
    const props = {
      ...defaultProps,
      onLoadJobsList: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find('JobsList')
      .props()
      .onRefresh()

    expect(props.onLoadJobsList).toHaveBeenCalledTimes(1)
  })
})
