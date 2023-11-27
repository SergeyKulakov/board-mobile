import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../index'

describe('Dialog', () => {
  const defaultProps = {
    editText: 'editText',
    deleteText: 'deleteText',
    onEdit: () => null,
    onDelete: () => null,
    isVisible: true,
    onClose: () => null,
    t: text => text,
  }
  const getDialogRef = () => ({
    current: {
      handleDismiss: jest.fn(),
    },
  })

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('call edit action', () => {
    const props = {
      ...defaultProps,
      onEdit: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.onEdit).not.toHaveBeenCalled()

    wrapper
      .find(getTestID('editButton'))
      .props()
      .onPress()

    expect(props.onEdit).toHaveBeenCalledTimes(1)
  })

  it('call delete action', done => {
    const props = {
      ...defaultProps,
      onDelete: jest.fn(),
    }
    const dialogRef = getDialogRef()

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().dialog = dialogRef

    wrapper
      .find(getTestID('deleteButton'))
      .props()
      .onPress()

    expect(dialogRef.current.handleDismiss).toHaveBeenCalledTimes(1)
    expect(props.onDelete).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(props.onDelete).toHaveBeenCalledTimes(1)
      done()
    }, 400)
  })

  describe('call back handler', () => {
    it('with isVisible', () => {
      const props = {
        ...defaultProps,
        onClose: jest.fn(),
        isVisible: true,
      }
      const dialogRef = getDialogRef()

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().dialog = dialogRef

      const response = wrapper.instance().handleBackPress()

      expect(response).toBe(false)

      expect(props.onClose).toHaveBeenCalledTimes(1)

      expect(dialogRef.current.handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('without isVisible', () => {
      const props = {
        ...defaultProps,
        onClose: jest.fn(),
        isVisible: false,
      }
      const dialogRef = getDialogRef()

      const wrapper = shallow(<Component {...props} />)

      wrapper.instance().dialog = dialogRef

      const response = wrapper.instance().handleBackPress()

      expect(response).toBe(true)

      expect(props.onClose).not.toHaveBeenCalled()

      expect(dialogRef.current.handleDismiss).not.toHaveBeenCalled()
    })
  })
})
