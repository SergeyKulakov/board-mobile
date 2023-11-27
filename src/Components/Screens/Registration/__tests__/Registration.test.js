import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../Registration'

describe('Registration', () => {
  const defaultProps = {
    navigate: {
      pop: () => null,
      showMessage: () => null,
      push: () => null,
      showModal: () => null,
      popTo: () => null,
    },
    isNotRootScreen: false,
    isShowButton: false,
    loadInfo: {
      loading: false,
    },
    isHideButton: false,
    onSignUp: () => null,
    onSetLanguage: () => null,
    getCurrentLanguage: () => null,
    getError: () => null,
    onShowPuck: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('set language', () => {
    it('not call after mounted component', () => {
      const props = {
        ...defaultProps,
        onSetLanguage: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.onSetLanguage).not.toHaveBeenCalled()
    })

    it('should be called', () => {
      const props = {
        ...defaultProps,
        onSetLanguage: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().handleSetLanguage()

      expect(props.onSetLanguage).toHaveBeenCalledTimes(1)
    })
  })

  describe('phones modal', () => {
    const mockFormikRef = shallowWrapper => {
      shallowWrapper.instance().form = {
        state: {
          values: {
            mobileNumber: '1234',
          },
        },
        setFieldValue: jest.fn(),
      }
    }
    it('should open phones modal', () => {
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn(),
        },
      }
      const wrapper = shallow(<Component {...props} />)

      // mock formik ref
      mockFormikRef(wrapper)

      expect(props.navigate.showModal).not.toHaveBeenCalled()

      wrapper.instance().handleOpenPhoneModal()

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
    })

    it('call onSubmit callback', done => {
      const callbackArgs = '1234'
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn((route, { onSubmit }) => {
            setTimeout(() => {
              onSubmit(callbackArgs)
            }, 1000)
          }),
        },
      }
      const wrapper = shallow(<Component {...props} />)

      // mock formik ref
      mockFormikRef(wrapper)

      expect(wrapper.instance().form.setFieldValue).not.toHaveBeenCalled()

      wrapper.instance().handleOpenPhoneModal()

      setTimeout(() => {
        expect(wrapper.instance().form.setFieldValue).toHaveBeenCalledTimes(1)
        expect(wrapper.instance().form.setFieldValue).toHaveBeenCalledWith(
          'mobileNumber',
          callbackArgs,
        )
        done()
      }, 1100)
    })
  })

  describe('handle submit action', () => {
    it('should show error if isAgree false', () => {
      const inputArgs = {
        isAgree: false,
      }
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps,
          showMessage: jest.fn(),
        },
        onSignUp: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onSignUp).not.toHaveBeenCalled()
      expect(props.navigate.showMessage).not.toHaveBeenCalled()

      wrapper.instance().handleSubmit(inputArgs)

      expect(props.navigate.showMessage).toHaveBeenCalledTimes(1)
    })

    describe('should call onSignUp', () => {
      const inputArgs = {
        isAgree: true,
      }
      it('failure response', done => {
        const errorResponse = {
          error: {
            payload: {
              code: 'some error code',
            },
          },
        }
        const props = {
          ...defaultProps,
          onShowPuck: jest.fn(),
          navigate: {
            ...defaultProps.navigate,
            showModal: jest.fn(),
            getError: jest.fn(),
          },
          onSignUp: jest.fn(({ callback }) => {
            setTimeout(() => {
              callback(errorResponse)
            }, 1000)
          }),
        }

        const wrapper = shallow(<Component {...props} />)

        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.navigate.showModal).not.toHaveBeenCalled()
        expect(props.navigate.getError).not.toHaveBeenCalled()
        expect(props.onSignUp).not.toHaveBeenCalled()

        wrapper.instance().handleSubmit(inputArgs)

        setTimeout(() => {
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          expect(props.navigate.showModal).not.toHaveBeenCalled()
          done()
        }, 1100)
      })

      it('successful response', done => {
        const props = {
          ...defaultProps,
          onShowPuck: jest.fn(),
          navigate: {
            ...defaultProps.navigate,
            showModal: jest.fn(),
            getError: jest.fn(),
          },
          onSignUp: jest.fn(({ callback }) => {
            setTimeout(() => {
              callback({})
            }, 1000)
          }),
        }

        const wrapper = shallow(<Component {...props} />)

        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.navigate.showModal).not.toHaveBeenCalled()
        expect(props.navigate.getError).not.toHaveBeenCalled()
        expect(props.onSignUp).not.toHaveBeenCalled()

        wrapper.instance().handleSubmit(inputArgs)

        setTimeout(() => {
          expect(props.onShowPuck).not.toHaveBeenCalled()
          expect(props.navigate.getError).not.toHaveBeenCalled()
          done()
        }, 1100)
      })
    })
  })
})
