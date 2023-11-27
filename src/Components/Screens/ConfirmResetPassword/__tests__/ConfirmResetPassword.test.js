import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { initialValues } from '../config'

import Component from '../ConfirmResetPassword'

describe('ConfirmResetPassword', () => {
  const defaultProps = {
    userName: 'username',
    onResetPassword: () => null,
    loadInfo: {
      loading: false,
    },
    navigate: {
      hideModal: () => null,
    },
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should call back action', () => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        hideModal: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.hideModal).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('header'))
      .props()
      .onBackClick()

    expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
  })

  it('render formik initial values', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(wrapper.find('Formik').props().initialValues).to.equal(
      initialValues,
    )
  })

  describe('submit action', () => {
    const serverError = {
      payload: {
        code: 'code',
      },
    }
    const getProps = isSuccessful => ({
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        hideModal: jest.fn(),
      },
      onResetPassword: jest.fn((request, callback) => {
        setTimeout(() => {
          callback({ error: isSuccessful ? undefined : serverError })
        }, 1000)
      }),
      userName: 'username',
      onShowPuck: jest.fn(),
      getError: jest.fn(),
      onSuccess: jest.fn(),
    })
    const values = {
      code: '1234',
      password: '1234Qwer',
    }

    it('not call bu default', () => {
      const props = getProps(true)

      shallow(<Component {...props} />)

      expect(props.navigate.hideModal).not.toHaveBeenCalled()
      expect(props.onResetPassword).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onSuccess).not.toHaveBeenCalled()
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find('Formik')
        .props()
        .onSubmit(values)

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.onResetPassword).toHaveBeenCalledTimes(1)
      expect(props.navigate.hideModal).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onSuccess).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.onResetPassword).toHaveBeenCalledTimes(1)
        expect(props.navigate.hideModal).toHaveBeenCalledTimes(1)
        expect(props.onSuccess).toHaveBeenCalledTimes(1)

        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      wrapper
        .find('Formik')
        .props()
        .onSubmit(values)

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.onResetPassword).toHaveBeenCalledTimes(1)
      expect(props.navigate.hideModal).not.toHaveBeenCalled()
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onSuccess).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.onResetPassword).toHaveBeenCalledTimes(1)
        expect(props.navigate.hideModal).not.toHaveBeenCalled()
        expect(props.onSuccess).not.toHaveBeenCalled()

        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith(serverError)
        done()
      }, 1100)
    })
  })
})
