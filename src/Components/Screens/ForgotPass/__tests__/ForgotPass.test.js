import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../ForgotPass'

describe('ForgotPass', () => {
  const defaultProps = {
    navigate: {},
    onForgotPass: () => null,
    t: text => text,
    onShowPuck: () => null,
    getError: () => null,
    username: 'username',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('form set touched', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const args = {
      values: {
        value: '',
      },
      touched: {},
      errors: {},
      setFieldTouched: jest.fn(),
      handleChange: () => null,
      handleBlur: () => null,
      handleSubmit: () => null,
    }

    const component = wrapper.instance().renderForm(args)

    expect(args.setFieldTouched).not.toHaveBeenCalled()

    component.props.children[0].props.children.props.onSetTouched()

    expect(args.setFieldTouched).toHaveBeenCalledTimes(1)
    expect(args.setFieldTouched).toHaveBeenCalledWith('value')
  })

  describe('submit action', () => {
    it('successful', done => {
      const props = {
        ...defaultProps,
        onForgotPass: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback({})
          }, 1000)
        }),
        onShowPuck: jest.fn(),
        getError: jest.fn(),
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn((route, { onSuccess }) => {
            setTimeout(onSuccess, 1000)
          }),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onForgotPass).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.navigate.showModal).not.toHaveBeenCalled()
      expect(wrapper.state().isRequest).toBe(false)

      const args = {
        value: ' value',
      }

      wrapper
        .find('Formik')
        .props()
        .onSubmit(args)

      expect(wrapper.state().isRequest).toBe(true)
      expect(props.onForgotPass).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.state().isRequest).toBe(false)
        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.navigate.showModal).toHaveBeenCalled()

        setTimeout(() => {
          expect(props.onShowPuck).toHaveBeenCalledTimes(1)
          done()
        }, 1100)
      }, 1100)
    })

    it('failure', done => {
      const errorResponse = {
        error: {
          payload: {
            code: 'some error code',
          },
        },
      }
      const props = {
        ...defaultProps,
        onForgotPass: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback(errorResponse)
          }, 1000)
        }),
        onShowPuck: jest.fn(),
        getError: jest.fn(),
        navigate: {
          ...defaultProps.navigate,
          showModal: jest.fn(),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onForgotPass).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.navigate.showModal).not.toHaveBeenCalled()
      expect(wrapper.state().isRequest).toBe(false)

      const args = {
        value: ' value',
      }

      wrapper
        .find('Formik')
        .props()
        .onSubmit(args)

      expect(wrapper.state().isRequest).toBe(true)
      expect(props.onForgotPass).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.state().isRequest).toBe(false)
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith(errorResponse.error)
        expect(props.navigate.showModal).not.toHaveBeenCalled()

        done()
      }, 1100)
    })
  })
})
