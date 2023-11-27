import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { PickOfWork as Component } from '../index'

describe('Profile.PickOfWork', () => {
  const defaultProps = {
    text: {
      picksOfWorkLengthErrorFree: 'picksOfWorkLengthErrorFree',
      picksOfWorkLengthErrorPremium: 'picksOfWorkLengthErrorPremium',
    },
    toast: () => null,
    userId: 'userId',
    values: {
      picsOfWork: [],
    },
    setFieldValue: () => null,
    isPremium: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('add image', () => {
    it('should not call by default', () => {
      const props = {
        ...defaultProps,
        toast: jest.fn(),
        setFieldValue: jest.fn(),
      }

      shallow(<Component {...props} />)

      expect(props.toast).not.toHaveBeenCalled()
      expect(props.setFieldValue).not.toHaveBeenCalled()
    })
    it('successful', () => {
      const props = {
        ...defaultProps,
        toast: jest.fn(),
        setFieldValue: jest.fn(),
        isPremium: false,
        values: {
          picsOfWork: [],
        },
      }

      const wrapper = shallow(<Component {...props} />)

      const args = '1213u01984u0r19843'
      wrapper
        .find(getTestID('UploadImages'))
        .props()
        .onAdd(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('picsOfWork', [
        {
          id: 0,
          image: `data:image/jpeg;base64,${args}`,
        },
      ])
    })
    describe('failure', () => {
      it('without premium', () => {
        const props = {
          ...defaultProps,
          toast: jest.fn(),
          setFieldValue: jest.fn(),
          isPremium: false,
          values: {
            picsOfWork: Array(5),
          },
        }

        const wrapper = shallow(<Component {...props} />)

        const args = '1213u01984u0r19843'
        wrapper
          .find(getTestID('UploadImages'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).not.toHaveBeenCalled()
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          props.text.picksOfWorkLengthErrorFree,
        )
      })

      it('without premium', () => {
        const props = {
          ...defaultProps,
          toast: jest.fn(),
          setFieldValue: jest.fn(),
          isPremium: true,
          values: {
            picsOfWork: Array(50),
          },
        }

        const wrapper = shallow(<Component {...props} />)

        const args = '1213u01984u0r19843'
        wrapper
          .find(getTestID('UploadImages'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).not.toHaveBeenCalled()
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          props.text.picksOfWorkLengthErrorPremium,
        )
      })
    })
  })

  it('remove image', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
      values: {
        picsOfWork: [
          {
            id: 0,
            image: '34891723017048ry103fufpoi',
          },
        ],
      },
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('UploadImages'))
      .props()
      .onDelete(0)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('picsOfWork', [])
  })
})
