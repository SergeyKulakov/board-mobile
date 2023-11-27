import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { Form as Component } from '../index'

describe('Profile.Form', () => {
  const defaultProps = {
    user: {
      avatarB64: 'avatar',
      idPics: [],
      picsOfWork: [],
      certificates: [],
      email_verified: 'false',
      phone_number_verified: 'false',
      isPremium: false,
    },
    values: {
      isProvider: true,
      services: [],
    },
    servicesLoading: false,
    userId: 'userId',
    text: {},
    isPremium: false,
    onOpenAddressModal: () => null,
    onOpenServices: () => null,
    onShowMessage: () => null,
    onOpenGoogleMap: () => null,
    onVerify: () => null,
    isRequest: false,
    isRequestVerifyEmail: false,
    isRequestVerifyPhone: false,
    onOpenPhoneModal: () => null,
    setValues: () => null,
    setFieldValue: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should update user data', () => {
    const props = {
      ...defaultProps,
      setValues: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.setValues).not.toHaveBeenCalled()

    wrapper.setProps({
      user: {
        ...props.user,
        idPics: ['1298yuduofld'],
        picsOfWork: ['1298yuduofld'],
        certificates: ['1298yuduofld'],
        avatarB64: '13703984710eryeowiufhaocjldk',
        email_verified: 'true',
        phone_number_verified: 'true',
      },
    })

    expect(props.setValues).toHaveBeenCalledTimes(1)
  })

  describe('toggle is provider [scroll]', () => {
    it('without provider', done => {
      const scrollRef = {
        current: {
          scrollTo: jest.fn(),
          scrollToEnd: jest.fn(),
        },
      }
      const scrollPosition = 100
      const props = {
        ...defaultProps,
        values: {
          ...defaultProps.values,
          isProvider: false,
        },
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().scrollContainer = scrollRef
      wrapper.instance().scrollPosition = scrollPosition

      expect(props.setFieldValue).not.toHaveBeenCalled()

      wrapper.instance().toggleIsProvider()

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        const component = wrapper.instance()

        expect(
          component.scrollContainer.current.scrollTo,
        ).toHaveBeenCalledTimes(1)
        expect(component.scrollContainer.current.scrollTo).toHaveBeenCalledWith(
          {
            y: component.scrollPosition + 400,
            animated: true,
          },
        )
        expect(
          component.scrollContainer.current.scrollToEnd,
        ).not.toHaveBeenCalled()
        done()
      }, 200)
    })

    it('with provider', done => {
      const scrollRef = {
        current: {
          scrollTo: jest.fn(),
          scrollToEnd: jest.fn(),
        },
      }
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          ...defaultProps.values,
          isProvider: true,
        },
      }
      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().scrollContainer = scrollRef

      expect(props.setFieldValue).not.toHaveBeenCalled()

      wrapper.instance().toggleIsProvider()

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)

      expect(
        wrapper.instance().scrollContainer.current.scrollToEnd,
      ).not.toHaveBeenCalled()
      expect(
        wrapper.instance().scrollContainer.current.scrollTo,
      ).not.toHaveBeenCalled()

      setTimeout(() => {
        const component = wrapper.instance()
        expect(
          component.scrollContainer.current.scrollTo,
        ).not.toHaveBeenCalled()
        expect(
          component.scrollContainer.current.scrollToEnd,
        ).toHaveBeenCalledTimes(1)
        done()
      }, 200)
    })
  })

  describe('submit action', () => {
    it('should not call actions after mounted', () => {
      const props = {
        ...defaultProps,
        values: {
          defaultRadius: '41213',
          isPro: true,
          firstName: 'dfasdfad',
          lastName: 'wddadsc',
          email: 'email@email.com',
          phoneNumber: '+390472341298',
        },
        onShowMessage: jest.fn(),
        setFieldValue: jest.fn(),
        handleSubmit: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.onShowMessage).not.toHaveBeenCalled()
      expect(props.setFieldValue).not.toHaveBeenCalled()
      expect(props.handleSubmit).not.toHaveBeenCalled()
    })

    it('successful validation', () => {
      const props = {
        ...defaultProps,
        values: {
          defaultRadius: '41213',
          isPro: false,
          firstName: 'dfasdfad',
          lastName: 'wddadsc',
          email: 'email@email.com',
          phoneNumber: '+390472341298',
        },
        onShowMessage: jest.fn(),
        setFieldValue: jest.fn(),
        handleSubmit: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ isButtonShow: true })

      wrapper
        .find(getTestID('submitButton'))
        .props()
        .onClick()

      expect(props.handleSubmit).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).not.toHaveBeenCalled()
      expect(props.onShowMessage).not.toHaveBeenCalled()
    })

    describe('failure validation', () => {
      it('without areYouPro error', () => {
        const props = {
          ...defaultProps,
          values: {
            defaultRadius: '41213',
            isPro: false,
            firstName: undefined,
            lastName: 'wddadsc',
            email: 'email@email.com',
            phoneNumber: '+390472341298',
          },
          onShowMessage: jest.fn(),
          setFieldValue: jest.fn(),
          handleSubmit: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper.setState({ isButtonShow: true })

        wrapper
          .find(getTestID('submitButton'))
          .props()
          .onClick()

        expect(props.handleSubmit).not.toHaveBeenCalled()
        expect(props.setFieldValue).not.toHaveBeenCalled()
        expect(props.onShowMessage).toHaveBeenCalledTimes(1)
      })
    })

    it('with areYouPro error', () => {
      const props = {
        ...defaultProps,
        values: {
          defaultRadius: '41213',
          isPro: true,
          certificates: [],
          firstName: undefined,
          lastName: 'wddadsc',
          email: 'email@email.com',
          phoneNumber: '+390472341298',
        },
        onShowMessage: jest.fn(),
        setFieldValue: jest.fn(),
        handleSubmit: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ isButtonShow: true })

      wrapper
        .find(getTestID('submitButton'))
        .props()
        .onClick()

      expect(props.handleSubmit).not.toHaveBeenCalled()
      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.onShowMessage).toHaveBeenCalledTimes(1)
    })

    describe('open add services modal', () => {
      it('should not call by default', () => {
        const props = {
          ...defaultProps,
          values: {
            ...defaultProps.values,
            services: [],
          },
          onOpenServices: jest.fn(),
        }

        shallow(<Component {...props} />)

        expect(props.onOpenServices).not.toHaveBeenCalled()
      })

      it('successful add service', () => {
        const props = {
          ...defaultProps,
          values: {
            ...defaultProps.values,
            services: [],
            isProvider: true,
          },
          onOpenServices: jest.fn(({ setServices }) => {
            setServices([])
          }),
          setFieldValue: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper
          .find(getTestID('service'))
          .props()
          .onAddServices()

        expect(props.onOpenServices).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      })
    })
  })
})
