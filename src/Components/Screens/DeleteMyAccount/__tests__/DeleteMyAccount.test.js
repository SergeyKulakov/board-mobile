import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../DeleteMyAccount'

describe('DeleteMyAccount', () => {
  const defaultProps = {
    activeLanguage: 'en',
    getError: () => null,
    navigate: {
      hideModal: () => null,
    },
    onDeleteAccount: () => null,
    onShowPuck: () => null,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderListFooter = wrapper.instance().renderListFooter()
    const renderListHeader = wrapper.instance().renderListHeader()
    const renderRow = wrapper.instance().renderRow({
      item: {
        value: true,
        onClick: () => null,
        text: 'text',
      },
    })

    expect([
      wrapper,
      renderListFooter,
      renderListHeader,
      renderRow,
    ]).toMatchSnapshot()
  })

  it('call handleChangeValue method', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().input = {
      current: {
        handleSetFocus: jest.fn(),
      },
    }

    wrapper.instance().handleChangeReason('value')

    expect(wrapper.state('reason')).toBe('value')

    wrapper.instance().handleChangeValue(2)

    expect(wrapper.state('checkedValue')).toBe(2)
    expect(wrapper.state('reason')).toBe('')
    expect(
      wrapper.instance().input.current.handleSetFocus,
    ).not.toHaveBeenCalled()

    wrapper.instance().handleChangeReason('value2')

    expect(wrapper.state('reason')).toBe('value2')

    wrapper.instance().handleChangeValue(6)

    expect(wrapper.state('checkedValue')).toBe(6)
    expect(wrapper.state('reason')).toBe('')
    expect(
      wrapper.instance().input.current.handleSetFocus,
    ).toHaveBeenCalledTimes(1)
  })

  describe('call submit action', () => {
    it('with warning', () => {
      const props = {
        ...defaultProps,
        onShowPuck: jest.fn(),
        onDeleteAccount: jest.fn(),
        getError: jest.fn(),
      }
      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ checkedValue: 6 })

      wrapper.instance().handleSubmit()

      expect(props.onDeleteAccount).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()
      expect(props.onShowPuck).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).toHaveBeenCalledWith({
        type: 'warning',
        message: 'deleteAccountScreen.writeYourReason',
      })
    })

    const getProps = isSuccessful => ({
      ...defaultProps,
      onDeleteAccount: jest.fn((request, callback) => {
        setTimeout(() => {
          callback({
            error: isSuccessful
              ? undefined
              : { payload: { code: 'some error code' } },
          })
        }, 1000)
      }),
      onShowPuck: jest.fn(),
      getError: jest.fn(),
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ checkedValue: 3 })

      wrapper.instance().handleSubmit()

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.onDeleteAccount).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.onDeleteAccount).toHaveBeenCalledTimes(1)
        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()

        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ checkedValue: 3 })

      wrapper.instance().handleSubmit()

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.onDeleteAccount).toHaveBeenCalledTimes(1)
      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.onDeleteAccount).toHaveBeenCalledTimes(1)
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith({
          payload: { code: 'some error code' },
        })

        done()
      }, 1100)
    })
  })
})
