import React from 'react'
import { shallow } from 'enzyme'
import { expect as chai } from 'chai'
import * as routes from 'Constants/routes'

import 'jest-styled-components'

import { Footer } from '../innerBlocks'
import Component from '../Login'

describe('Login', () => {
  const defaultProps = {
    isAuth: false,
    onAuth: () => null,
    navigate: {
      push: () => null,
      setupRoot: () => null,
    },
    onSetLanguage: () => null,
    loadInfo: {
      loading: false,
      success: false,
      error: null,
    },
    onSignIn: () => null,
    getCurrentLanguage: () => 'en',
    t: () => null,
    isNotRootScreen: false,
    getError: () => null,
    onShowPuck: () => null,
    isKeyboardShow: false,
    onCloseKeyboard: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('set language', () => {
    it('select current language', () => {
      const props = {
        ...defaultProps,
        onSetLanguage: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().handleCloseLanguagesModal = jest.fn()

      expect(props.onSetLanguage).not.toHaveBeenCalled()

      wrapper.instance().handleSetLanguage()

      expect(props.onSetLanguage).not.toHaveBeenCalled()
      expect(
        wrapper.instance().handleCloseLanguagesModal,
      ).not.toHaveBeenCalled()

      wrapper.instance().handleSetLanguage()

      expect(props.onSetLanguage).toHaveBeenCalledTimes(0)
      expect(
        wrapper.instance().handleCloseLanguagesModal,
      ).toHaveBeenCalledTimes(0)
    })

    it('select other language', () => {
      const props = {
        ...defaultProps,
        onSetLanguage: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().handleCloseLanguagesModal = jest.fn()

      expect(props.onSetLanguage).not.toHaveBeenCalled()

      wrapper.instance().handleSetLanguage()

      expect(props.onSetLanguage).not.toHaveBeenCalled()
      expect(
        wrapper.instance().handleCloseLanguagesModal,
      ).not.toHaveBeenCalled()

      wrapper.setState({ activeLanguage: 'es' })

      wrapper.instance().handleSetLanguage()

      expect(props.onSetLanguage).toHaveBeenCalledTimes(1)
      expect(
        wrapper.instance().handleCloseLanguagesModal,
      ).toHaveBeenCalledTimes(1)
    })
  })

  describe('sign in', () => {
    const request = {
      email: 'email',
      password: 'password',
      isRemember: true,
    }
    it('should close keyboard [not show by default]', () => {
      const props = {
        ...defaultProps,
        isKeyboardShow: false,
        onCloseKeyboard: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onCloseKeyboard).not.toHaveBeenCalled()

      wrapper.instance().handleSignIn(request)

      expect(props.onCloseKeyboard).not.toHaveBeenCalled()
    })

    it('should close keyboard [show by default]', () => {
      const props = {
        ...defaultProps,
        isKeyboardShow: true,
        onCloseKeyboard: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onCloseKeyboard).not.toHaveBeenCalled()

      wrapper.instance().handleSignIn(request)

      expect(props.onCloseKeyboard).toHaveBeenCalledTimes(1)
    })
    it('should start loading', () => {
      const props = {
        ...defaultProps,
        onSignIn: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback({})
          }, 1000)
        }),
      }
      const wrapper = shallow(<Component {...props} />)

      chai(wrapper.state('isRequest')).to.be.false

      wrapper.instance().handleSignIn(request)

      chai(wrapper.state('isRequest')).to.be.true

      setTimeout(() => {
        chai(wrapper.state('isRequest')).to.be.false
      }, 1100)
    })

    describe('call onSignIn', () => {
      it('successful request', () => {
        const props = {
          ...defaultProps,
          onSignIn: jest.fn(({ callback }) => {
            setTimeout(() => {
              callback({})
            }, 1000)
          }),
          navigate: {
            setupRoot: jest.fn(),
          },
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper.instance().handleSignIn(request)

        expect(props.navigate.setupRoot).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.navigate.setupRoot).toHaveBeenCalled()
        }, 1100)
      })
      describe('failure request', () => {
        it('UserNotConfirmedException error', () => {
          const error = {
            error: {
              payload: {
                code: 'UserNotConfirmedException',
              },
            },
          }
          const props = {
            ...defaultProps,
            onSignIn: jest.fn(({ callback }) => {
              setTimeout(() => {
                callback(error)
              }, 1000)
            }),
            navigate: {
              showModal: jest.fn(),
            },
          }

          const wrapper = shallow(<Component {...props} />)

          wrapper.instance().handleSignIn(request)

          expect(props.navigate.showModal).not.toHaveBeenCalled()

          setTimeout(() => {
            expect(props.navigate.showModal).toHaveBeenCalled()
            expect(props.navigate.showModal).toHaveBeenCalledWith(
              routes.confirmSignUp,
              { editable: true, userName: request.email },
            )
          }, 1100)
        })
        it('other error', () => {
          const error = {
            error: {
              payload: {
                code: 'some error',
              },
            },
          }
          const props = {
            ...defaultProps,
            onSignIn: jest.fn(({ callback }) => {
              setTimeout(() => {
                callback(error)
              }, 1000)
            }),
            navigate: {
              showModal: jest.fn(),
            },
            onShowPuck: jest.fn(),
            getError: jest.fn(),
          }

          const wrapper = shallow(<Component {...props} />)

          wrapper.instance().handleSignIn(request)

          expect(props.navigate.showModal).not.toHaveBeenCalled()
          expect(props.getError).not.toHaveBeenCalled()
          expect(props.onShowPuck).not.toHaveBeenCalled()

          setTimeout(() => {
            expect(props.navigate.showModal).not.toHaveBeenCalled()
            expect(props.getError).toHaveBeenCalledTimes(1)
            expect(props.getError).toHaveBeenCalledWith(error.error)
            expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          }, 1100)
        })
      })
    })
  })
  it('open change password screen', () => {
    const props = {
      ...defaultProps,
      navigate: {
        push: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.push).not.toHaveBeenCalled()

    wrapper.instance().handleOpenChangePasswordScreen()

    expect(props.navigate.push).toHaveBeenCalledTimes(1)
  })

  describe('back icon call action', () => {
    it('if isNotRootScreen true', () => {
      const props = {
        ...defaultProps,
        isNotRootScreen: true,
        navigate: {
          pop: jest.fn(),
          push: jest.fn(),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.pop).not.toHaveBeenCalled()
      expect(props.navigate.push).not.toHaveBeenCalled()

      wrapper
        .find(Footer)
        .props()
        .onSignUpClick()

      expect(props.navigate.pop).toHaveBeenCalledTimes(1)
      expect(props.navigate.push).not.toHaveBeenCalled()
    })

    it('if isNotRootScreen false', () => {
      const props = {
        ...defaultProps,
        isNotRootScreen: false,
        navigate: {
          pop: jest.fn(),
          push: jest.fn(),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.pop).not.toHaveBeenCalled()
      expect(props.navigate.push).not.toHaveBeenCalled()

      wrapper
        .find(Footer)
        .props()
        .onSignUpClick()

      expect(props.navigate.pop).not.toHaveBeenCalled()
      expect(props.navigate.push).toHaveBeenCalledTimes(1)
      expect(props.navigate.push).toHaveBeenCalledWith(routes.singUp, {
        isHideButton: false,
        isNotRootScreen: true,
      })
    })
  })
})
