import React from 'react'
import { shallow } from 'enzyme'
import { expect as chai, assert } from 'chai'
import * as routes from 'Constants/routes'

import 'jest-styled-components'

import Component from '../Profile'

jest.mock('../config.js', () => ({
  getText: () => ({}),
  getInitialValue: () => ({}),
  getResultObject: (user, values) => values,
}))

describe('Profile', () => {
  const defaultProps = {
    user: {},
    isRequest: false,
    services: [],
    servicesLoadInfo: {},
    navigate: {
      pop: () => null,
    },
    onLoadServices: () => null,
    onUpdateUserData: () => null,
    onSetLanguage: () => null,
    onResendVerifyCode: () => null,
    onShowPuck: () => null,
    isShowPack: false,
    t: () => null,
    getError: () => null,
    onLoadUser: () => null,
    componentId: 'componentId',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('set initial value', () => {
    const mockFormikRef = shallowWrapper => {
      shallowWrapper.instance().form = {
        setValues: jest.fn(),
      }
    }
    it('should update formik values after update user data', () => {
      const props = {
        ...defaultProps,
        user: {
          given_name: 'name',
          family_name: 'second name',
        },
      }

      const wrapper = shallow(<Component {...props} />)

      mockFormikRef(wrapper)

      expect(wrapper.instance().form.setValues).not.toHaveBeenCalled()

      const nextProps = {
        user: {
          given_name: 'name1',
          family_name: 'second name2',
        },
      }

      wrapper.setProps(nextProps)

      expect(wrapper.instance().form.setValues).toHaveBeenCalledTimes(1)
    })
  })

  it('set language', () => {
    const props = {
      ...defaultProps,
      onSetLanguage: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleCloseLanguagesModal = jest.fn()
    wrapper.instance()._setText = jest.fn()

    expect(props.onSetLanguage).not.toHaveBeenCalled()

    wrapper.instance().handleSetLanguage()

    expect(props.onSetLanguage).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleCloseLanguagesModal).toHaveBeenCalledTimes(
      1,
    )
    expect(wrapper.instance()._setText).toHaveBeenCalledTimes(1)
  })

  describe('call methods of class', () => {
    it('open address modal', () => {
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn(),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.showModal).not.toHaveBeenCalled()

      const args = 'args'

      wrapper.instance().handleOpenAddressModal(args)

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
      expect(props.navigate.showModal).toHaveBeenCalledWith(
        routes.locationModal,
        args,
      )
    })

    it('open phone modal', done => {
      const mockFormikRef = {
        state: {
          values: {
            phoneNumber: 'some phone',
          },
        },
        setFieldValue: jest.fn(),
      }
      const phone = 'some phone'
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn((route, { onSubmit }) => {
            setTimeout(() => {
              onSubmit(phone)
            }, 1000)
          }),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().form = mockFormikRef

      expect(props.navigate.showModal).not.toHaveBeenCalled()

      wrapper.instance().handleOpenPhoneModal()

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.instance().form.setFieldValue).toHaveBeenCalledTimes(1)
        expect(wrapper.instance().form.setFieldValue).toHaveBeenCalledWith(
          'phoneNumber',
          phone,
        )
        done()
      }, 1100)
    })

    it('open service modal', () => {
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn(),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.showModal).not.toHaveBeenCalled()

      const args = 'args'

      wrapper.instance().handleOpenServices(args)

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
      expect(props.navigate.showModal).toHaveBeenCalledWith(
        routes.servicesModal,
        args,
      )
    })

    it('open google map modal', () => {
      const props = {
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn(),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.navigate.showModal).not.toHaveBeenCalled()

      const args = 'args'

      wrapper.instance().handleOpenGoogleMap(args)

      expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
      expect(props.navigate.showModal).toHaveBeenCalledWith(
        routes.googleMapModal,
        args,
      )
    })

    describe('open verify modal', () => {
      const errorResponse = {
        error: {
          payload: {
            code: 'some error code',
          },
        },
      }
      const getProps = isSuccess => ({
        ...defaultProps,
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn(),
          showMessage: jest.fn(),
        },
        onResendVerifyCode: jest.fn((type, callback) => {
          setTimeout(() => {
            callback(isSuccess ? {} : errorResponse)
          }, 1000)
        }),
        getError: jest.fn(),
      })

      it('phone_number request loading', done => {
        const props = getProps(false)

        const wrapper = shallow(<Component {...props} />)

        chai(wrapper.state('isRequestVerifyEmail')).to.be.false
        chai(wrapper.state('isRequestVerifyPhone')).to.be.false

        const agrs = ['phone_number', 'some new phone number']

        wrapper.instance().handleOpenVerifyModal(...agrs)

        chai(wrapper.state('isRequestVerifyEmail')).to.be.false
        chai(wrapper.state('isRequestVerifyPhone')).to.be.true

        setTimeout(() => {
          chai(wrapper.state('isRequestVerifyEmail')).to.be.false
          chai(wrapper.state('isRequestVerifyPhone')).to.be.false
          done()
        }, 1100)
      })

      it('email request loading', done => {
        const props = getProps(false)

        const wrapper = shallow(<Component {...props} />)

        chai(wrapper.state('isRequestVerifyEmail')).to.be.false
        chai(wrapper.state('isRequestVerifyPhone')).to.be.false

        const agrs = ['email', 'some new email']

        wrapper.instance().handleOpenVerifyModal(...agrs)

        chai(wrapper.state('isRequestVerifyEmail')).to.be.true
        chai(wrapper.state('isRequestVerifyPhone')).to.be.false

        setTimeout(() => {
          chai(wrapper.state('isRequestVerifyEmail')).to.be.false
          chai(wrapper.state('isRequestVerifyPhone')).to.be.false
          done()
        }, 1100)
      })

      it('failure verify request', done => {
        const props = getProps(false)

        const wrapper = shallow(<Component {...props} />)

        const agrs = ['email', 'some new email']

        wrapper.instance().handleOpenVerifyModal(...agrs)

        expect(props.navigate.showModal).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.navigate.showMessage).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.navigate.showMessage).toHaveBeenCalledTimes(1)
          expect(props.getError).toHaveBeenCalledTimes(1)
          expect(props.getError).toHaveBeenCalledWith(errorResponse.error)
          expect(props.navigate.showModal).not.toHaveBeenCalled()
          done()
        }, 1100)
      })

      it('successful request', done => {
        const props = getProps(true)

        const wrapper = shallow(<Component {...props} />)

        const agrs = ['email', 'some new email']

        wrapper.instance().handleOpenVerifyModal(...agrs)

        expect(props.navigate.showModal).not.toHaveBeenCalled()

        setTimeout(() => {
          expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      })
    })

    describe('submit action', () => {
      it('submit loading', () => {
        const props = {
          ...defaultProps,
          onShowPuck: jest.fn(),
          getError: jest.fn(),
          onUpdateUserData: jest.fn(({ callback }) => {
            setTimeout(() => {
              callback({})
            }, 1000)
          }),
        }

        const wrapper = shallow(<Component {...props} />)

        const values = {
          certificates: [],
          avatarB64: 'avatarB64',
          idPics: [],
          picsOfWork: [],
          family_name: 'same family name',
        }

        chai(wrapper.state('isRequest')).to.be.false

        wrapper.instance().handleSubmit(values)

        chai(wrapper.state('isRequest')).to.be.true

        setTimeout(() => {
          assert.typeOf(wrapper.state('isRequest'), 'boolean')
        }, 1100)
      })
      it('failure request', done => {
        const requestError = {
          error: {
            payload: {
              code: 'some error',
            },
          },
        }
        const props = {
          ...defaultProps,
          onShowPuck: jest.fn(),
          getError: jest.fn(),
          onUpdateUserData: jest.fn(({ callback }) => {
            setTimeout(() => {
              callback(requestError)
            }, 1000)
          }),
        }

        const wrapper = shallow(<Component {...props} />)

        expect(props.onUpdateUserData).not.toHaveBeenCalled()

        const values = {
          certificates: [],
          avatarB64: 'avatarB64',
          idPics: [],
          picsOfWork: [],
          family_name: 'same family name',
        }

        wrapper.instance().handleSubmit(values)

        setTimeout(() => {
          expect(props.onUpdateUserData).toHaveBeenCalledTimes(1)
          setTimeout(() => {
            expect(props.onShowPuck).toHaveBeenCalledTimes(1)
            expect(props.getError).toHaveBeenCalledTimes(1)
          }, 1100)

          done()
        }, 1000)
      })

      describe('successful request', () => {
        it('without need verified', done => {
          const props = {
            ...defaultProps,
            onShowPuck: jest.fn(),
            getError: jest.fn(),
            onUpdateUserData: jest.fn(({ callback }) => {
              setTimeout(() => {
                callback({})
              }, 1000)
            }),
            navigate: {
              ...defaultProps.navigate,
              showModal: jest.fn(),
            },
          }

          const wrapper = shallow(<Component {...props} />)

          const values = {
            certificates: [],
            avatarB64: 'avatarB64',
            idPics: [],
            picsOfWork: [],
            family_name: 'same family name',
          }

          wrapper.instance().handleSubmit(values)

          wrapper.instance()._exitPage = jest.fn()

          setTimeout(() => {
            // expect(wrapper.instance()._exitPage).toHaveBeenCalledTimes(1)
            expect(props.navigate.showModal).not.toHaveBeenCalled()
            done()
          }, 1100)
        })
        describe('with need verify', () => {
          const getProps = () => ({
            ...defaultProps,
            onShowPuck: jest.fn(),
            getError: jest.fn(),
            onUpdateUserData: jest.fn(({ callback }) => {
              setTimeout(() => {
                callback({})
              }, 1000)
            }),
            navigate: {
              ...defaultProps.navigate,
              showModal: jest.fn((route, { onSuccess }) => {
                setTimeout(() => {
                  onSuccess()
                }, 1000)
              }),
            },
          })

          it('email', done => {
            const props = getProps()

            const wrapper = shallow(<Component {...props} />)

            const values = {
              certificates: [],
              avatarB64: 'avatarB64',
              idPics: [],
              picsOfWork: [],
              family_name: 'same family name',
              email: 'new email',
            }

            wrapper.instance().handleSubmit(values)

            wrapper.instance()._exitPage = jest.fn()

            setTimeout(() => {
              expect(wrapper.instance()._exitPage).not.toHaveBeenCalled()
              expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
              expect(props.navigate.showModal).toHaveBeenCalledWith(
                routes.verificationsPhoneOrEmail,
                {
                  attributeName: 'email',
                  userName: values.email,
                  onSuccess: wrapper.instance()._exitPage,
                },
              )
              setTimeout(() => {
                expect(wrapper.instance()._exitPage).toHaveBeenCalledTimes(1)
                done()
              }, 1100)
            }, 1100)
          })

          // it('phone number', done => {
          //   const props = getProps()
          //
          //   const wrapper = shallow(<Component {...props} />)
          //
          //   const values = {
          //     certificates: [],
          //     avatarB64: 'avatarB64',
          //     idPics: [],
          //     picsOfWork: [],
          //     family_name: 'same family name',
          //     phoneNumber: 'new phoneNumber',
          //   }
          //
          //   wrapper.instance().handleSubmit(values)
          //
          //   wrapper.instance()._exitPage = jest.fn()
          //
          //   setTimeout(() => {
          //     expect(wrapper.instance()._exitPage).not.toHaveBeenCalled()
          //     expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
          //     expect(props.navigate.showModal).toHaveBeenCalledWith(
          //       routes.verificationsPhoneOrEmail,
          //       {
          //         attributeName: 'phone_number',
          //         userName: values.phoneNumber,
          //         onSuccess: wrapper.instance()._exitPage,
          //       },
          //     )
          //     setTimeout(() => {
          //       expect(wrapper.instance()._exitPage).toHaveBeenCalledTimes(1)
          //       done()
          //     }, 1100)
          //   }, 1100)
          // })
        })
      })
    })
  })
})
