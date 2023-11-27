import React from 'react'
import { shallow } from 'enzyme'
import { expect as chai } from 'chai'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../FilterJobs'

describe('FilterJobs', () => {
  const defaultProps = {
    user: {
      defaultRadius: 10,
    },
    navigate: {
      showSidebar: () => null,
      pop: () => null,
    },
    onLoadServices: () => null,
    onLoadPopularServices: () => null,
    categories: [],
    popularServices: [],
    setValues: () => null,
    onSubmit: () => null,
    filters: {},
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const args = {
      values: {
        address: 'address',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
        country: 'country',
        searchCategories: 'searchCategories',
        lat: 12.4123,
        lon: 12.4123,
        services: [],
        search: 'search',
        radius: 100,
        selectedAll: false,
      },
      setFieldValue: () => null,
      setValues: () => null,
      handleSubmit: () => null,
    }

    const renderContent = wrapper.instance().renderContent(args)

    expect([wrapper, renderContent]).toMatchSnapshot()
  })

  describe('submit action', () => {
    it('with geoposition', () => {
      const props = {
        ...defaultProps,
        onSubmit: jest.fn(),
      }
      const submitObg = {
        address: 'address',
        city: 'city',
        country: 'country',
        lat: 10.4,
        lon: 10.4,
        state: 'state',
        zipCode: 'zipCode',
        services: [],
      }
      const wrapper = shallow(<Component {...props} />)

      expect(props.onSubmit).not.toHaveBeenCalled()

      wrapper
        .find('Formik')
        .props()
        .onSubmit(submitObg)

      expect(props.onSubmit).toHaveBeenCalledTimes(1)

      delete submitObg.services

      expect(props.onSubmit).toHaveBeenCalledWith(submitObg)
    })

    it('with out geoposition but with services', () => {
      const props = {
        ...defaultProps,
        onSubmit: jest.fn(),
      }
      const submitObg = {
        services: [
          {
            _id: '1234',
            title: 'title',
          },
        ],
      }
      const wrapper = shallow(<Component {...props} />)

      expect(props.onSubmit).not.toHaveBeenCalled()

      wrapper
        .find('Formik')
        .props()
        .onSubmit(submitObg)

      expect(props.onSubmit).toHaveBeenCalledTimes(1)

      expect(props.onSubmit).toHaveBeenCalledWith(submitObg)
    })
  })

  describe('component did mount call actions', () => {
    it('with popularServices', () => {
      const props = {
        ...defaultProps,
        popularServices: [{ _id: '1234', title: 'title' }],
        onLoadPopularServices: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.onLoadPopularServices).not.toHaveBeenCalled()
    })

    describe('without popularServices', () => {
      const serverError = {
        payload: {
          code: 'code',
        },
      }
      const getProps = isSuccessful => ({
        ...defaultProps,
        getError: jest.fn(),
        onShowPuck: jest.fn(),
        onLoadPopularServices: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback({ error: isSuccessful ? undefined : serverError })
          }, 1000)
        }),
      })

      it('successful', done => {
        const props = getProps(true)

        shallow(<Component {...props} />)

        expect(props.onLoadPopularServices).toHaveBeenCalledTimes(1)
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.getError).not.toHaveBeenCalled()
          expect(props.onShowPuck).not.toHaveBeenCalled()
          done()
        }, 1100)
      })

      it('failure', done => {
        const props = getProps(false)

        shallow(<Component {...props} />)

        expect(props.onLoadPopularServices).toHaveBeenCalledTimes(1)
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.getError).toHaveBeenCalledTimes(1)
          expect(props.getError).toHaveBeenCalledWith(serverError)
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      })
    })

    it('with categories', () => {
      const props = {
        ...defaultProps,
        categories: [{ _id: '1234', title: 'title' }],
        onLoadServices: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.onLoadServices).not.toHaveBeenCalled()
    })

    describe('without categories', () => {
      const serverError = {
        payload: {
          code: 'code',
        },
      }
      const getProps = isSuccessful => ({
        ...defaultProps,
        getError: jest.fn(),
        onShowPuck: jest.fn(),
        onLoadServices: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback({ error: isSuccessful ? undefined : serverError })
          }, 1000)
        }),
      })

      it('successful', done => {
        const props = getProps(true)

        shallow(<Component {...props} />)

        expect(props.onLoadServices).toHaveBeenCalledTimes(1)
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.getError).not.toHaveBeenCalled()
          expect(props.onShowPuck).not.toHaveBeenCalled()
          done()
        }, 1100)
      })

      it('failure', done => {
        const props = getProps(false)

        shallow(<Component {...props} />)

        expect(props.onLoadServices).toHaveBeenCalledTimes(1)
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onShowPuck).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.getError).toHaveBeenCalledTimes(1)
          expect(props.getError).toHaveBeenCalledWith(serverError)
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      })
    })
  })

  describe('initial filters', () => {
    it('should be default filters obj', () => {
      const wrapper = shallow(<Component {...defaultProps} />)

      const initialFiltersValues = {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        searchCategories: '',
        lat: '',
        lon: '',
        services: [],
        search: '',
        radius: '10',
        selectedAll: false,
      }

      expect(wrapper.find('Formik').props().initialValues).toEqual(
        initialFiltersValues,
      )
    })
    it('should be generate filters with outside filter object', () => {
      const props = {
        ...defaultProps,
        filters: {
          address: 'address',
          city: 'city',
          state: 'state',
          zipCode: 'zipCode',
          country: 'country',
          lat: '10.12231',
          lon: '10.12231',
          services: [{ _id: 'serviceId', title: 'title' }],
        },
      }

      const wrapper = shallow(<Component {...props} />)

      const resultFilters = {
        address: 'address',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
        country: 'country',
        searchCategories: '',
        lat: '10.12231',
        lon: '10.12231',
        services: [{ _id: 'serviceId', title: 'title' }],
        search: '',
        radius: '10',
        selectedAll: false,
      }

      expect(wrapper.find('Formik').props().initialValues).toEqual(
        resultFilters,
      )
    })
  })

  describe('render screen loader', () => {
    const props = {
      ...defaultProps,
      categories: new Array(5).fill({ _id: '_id', title: 'title' }),
      popularServices: new Array(5).fill({ _id: '_id', title: 'title' }),
    }

    it('should de false default', () => {
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.find(getTestID('screenLoader')).props().visible).toEqual(
        false,
      )
    })

    it('should render loader component', () => {
      const wrapper = shallow(<Component {...props} />)
      chai(wrapper.find(getTestID('screenLoader'))).to.be.lengthOf(1)
    })

    it('should be dependence with loading.all', () => {
      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ loading: { ...wrapper.state('loading'), all: true } })

      expect(wrapper.find(getTestID('screenLoader')).props().visible).toEqual(
        true,
      )
    })

    it('should be dependence with loading.popular', () => {
      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({
        loading: { ...wrapper.state('loading'), all: false, popular: true },
      })

      expect(wrapper.find(getTestID('screenLoader')).props().visible).toEqual(
        true,
      )
    })
  })

  it('should reset form', () => {
    const formRef = {
      setValues: jest.fn(),
    }
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().form = formRef

    wrapper
      .find('Header')
      .props()
      .onClearClick()

    expect(wrapper.instance().form.setValues).toHaveBeenCalledTimes(1)
  })
})
