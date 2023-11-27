import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { Certificates as Component } from '../index'

describe('Profile.Certificates', () => {
  const defaultProps = {
    values: {
      certificates: [],
      isPro: false,
    },
    text: {
      UploadImages: {
        certificatesLengthError: 'certificatesLengthError',
      },
    },
    handleChange: () => null,
    setFieldValue: () => null,
    handleBlur: () => null,
    toast: () => {},
    userId: 'userId',
    isPremium: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('add certificate image', () => {
    it('without premium', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        toast: jest.fn(),
        values: {
          ...defaultProps.values,
          certificates: [{ id: '1', image: '2312413093-09ur1e9f1er9fh1-rfhu' }],
        },
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.setFieldValue).not.toHaveBeenCalled()
      expect(props.toast).not.toHaveBeenCalled()

      const args = '2312031204710239874192837501938275109328n1098nyfniy0'

      wrapper
        .find('UploadImages')
        .props()
        .onAdd(args)

      expect(props.setFieldValue).not.toHaveBeenCalled()
      expect(props.toast).toHaveBeenCalledTimes(1)
      expect(props.toast).toHaveBeenCalledWith(
        props.text.UploadImages.certificatesLengthError,
      )
    })

    it('without premium & without certificates', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        toast: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.setFieldValue).not.toHaveBeenCalled()
      expect(props.toast).not.toHaveBeenCalled()

      const args = '2312031204710239874192837501938275109328n1098nyfniy0'

      wrapper
        .find('UploadImages')
        .props()
        .onAdd(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.toast).not.toHaveBeenCalled()
    })
  })

  it('delete image', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
      values: {
        ...defaultProps.values,
        certificates: [
          { id: '1', image: '1237430198473re' },
          { id: '2', image: '123919873ye98yf9qur' },
        ],
      },
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.setFieldValue).not.toHaveBeenCalled()

    const args = '1'

    wrapper
      .find('UploadImages')
      .props()
      .onDelete(args)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith(
      'certificates',
      props.values.certificates.filter(el => el.id !== args),
    )
  })
})
