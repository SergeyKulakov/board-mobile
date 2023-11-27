import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { PickUserId as Component } from '../index'

describe('Profile.PickUserId', () => {
  const defaultProps = {
    text: {
      idPicksLengthError: 'idPicksLengthError',
    },
    toast: () => null,
    userId: 'userId',
    values: {},
    setFieldValue: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it("shouldn't call set action by default", () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
    }

    shallow(<Component {...props} />)

    expect(props.setFieldValue).not.toHaveBeenCalled()
  })

  describe('add images', () => {
    it('successful', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          idPics: [
            {
              id: 0,
              image: '103874103yeoiuwdhlkj',
            },
          ],
        },
      }

      const wrapper = shallow(<Component {...props} />)

      const args = '124012398ryoewiufhd'

      wrapper
        .find(getTestID('UploadImages'))
        .props()
        .onAdd(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith(
        'idPics',
        props.values.idPics.concat([
          {
            id: 1,
            image: `data:image/png;base64,${args}`,
          },
        ]),
      )
    })

    it('failure', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          idPics: Array(5),
        },
      }

      const wrapper = shallow(<Component {...props} />)

      const args = '124012398ryoewiufhd'

      wrapper
        .find(getTestID('UploadImages'))
        .props()
        .onAdd(args)

      expect(props.setFieldValue).not.toHaveBeenCalled()
    })
  })

  it('remove image', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
      values: {
        idPics: [
          {
            id: 0,
            image: '103874103yeoiuwdhlkj',
          },
        ],
      },
    }

    const wrapper = shallow(<Component {...props} />)

    const args = 0

    wrapper
      .find(getTestID('UploadImages'))
      .props()
      .onDelete(args)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('idPics', [])
  })
})
