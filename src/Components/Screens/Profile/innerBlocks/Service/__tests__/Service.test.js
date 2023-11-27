import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'
import 'jest-styled-components'

import { Service as Component } from '../index'

describe('Profile.Service', () => {
  const defaultProps = {
    text: {
      servicesLengthError: 'servicesLengthError',
    },
    values: {
      services: [],
    },
    setFieldValue: () => null,
    isPremium: false,
    onAddServices: () => null,
    onEditServices: () => null,
    handleBlur: () => null,
    toast: () => null,
    services: [],
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('service actions', () => {
    describe('edit', () => {
      it("shouldn't call edit by default", () => {
        const props = {
          ...defaultProps,
          onEditServices: jest.fn(),
        }

        shallow(<Component {...props} />)

        expect(props.onEditServices).not.toHaveBeenCalled()
      })

      it('shouldn\t call edit without arguments', () => {
        const props = {
          ...defaultProps,
          onEditServices: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        wrapper.instance().handleEdit()

        expect(props.onEditServices).not.toHaveBeenCalled()
      })

      it('with category', () => {
        const props = {
          ...defaultProps,
          onEditServices: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        const args = {
          _id: 0,
          categoryId: 1,
        }
        wrapper.instance().handleEdit(args)

        expect(props.onEditServices).toHaveBeenCalledTimes(1)
        expect(props.onEditServices).toHaveBeenCalledWith({
          serviceId: args._id,
          categoryId: args.categoryId,
          step: 2,
        })
      })

      it('without category', () => {
        const props = {
          ...defaultProps,
          onEditServices: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        const args = {
          _id: 0,
        }
        wrapper.instance().handleEdit(args)

        expect(props.onEditServices).toHaveBeenCalledTimes(1)
        expect(props.onEditServices).toHaveBeenCalledWith({
          categoryId: args._id,
          step: 1,
        })
      })
    })

    it('delete', () => {
      const props = {
        ...defaultProps,
        setFieldValue: jest.fn(),
        values: {
          ...defaultProps.values,
          services: [
            {
              _id: 0,
            },
          ],
        },
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 0
      wrapper.instance().handleDelete(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('services', [])
    })

    describe('add', () => {
      it("shouldn't call add by default", () => {
        const props = {
          ...defaultProps,
          onAddServices: jest.fn(),
        }

        shallow(<Component {...props} />)

        expect(props.onAddServices).not.toHaveBeenCalled()
      })

      it('with premium', () => {
        const props = {
          ...defaultProps,
          onAddServices: jest.fn(),
          isPremium: true,
          values: {
            ...defaultProps.values,
            services: Array(3),
          },
          toast: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        for (let i = 0; i < 10; i++) {
          wrapper.instance().handleAddService()
          expect(props.onAddServices).toHaveBeenCalledTimes(i + 1)
          expect(props.toast).not.toHaveBeenCalled()
        }
      })

      it('without premium', () => {
        const props = {
          ...defaultProps,
          onAddServices: jest.fn(),
          isPremium: false,
          values: {
            ...defaultProps.values,
            services: [],
          },
          toast: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        for (let i = 0; i < 10; i++) {
          wrapper.instance().handleAddService()
          if (i <= 3) {
            wrapper.setProps({
              values: {
                services: [...wrapper.instance().props.values.services, 1],
              },
            })
          }
        }

        expect(props.onAddServices).toHaveBeenCalledTimes(3)
        expect(props.toast).toHaveBeenCalledTimes(7)
      })
    })

    it('toggle active status switch', () => {
      const props = {
        ...defaultProps,
        values: {
          services: [
            {
              _id: 0,
              status: 'active',
            },
            {
              _id: 1,
              status: 'inactive',
            },
          ],
        },
        setFieldValue: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const args = 0

      wrapper.instance().handleToggleActive(args)

      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('services', [
        {
          _id: 0,
          status: 'inactive',
        },
        {
          _id: 1,
          status: 'inactive',
        },
      ])

      wrapper.setProps({
        values: {
          services: [
            {
              _id: 0,
              status: 'inactive',
            },
            {
              _id: 1,
              status: 'inactive',
            },
          ],
        },
      })

      const args2 = 1

      wrapper.instance().handleToggleActive(args2)

      expect(props.setFieldValue).toHaveBeenCalledTimes(2)
      expect(props.setFieldValue).toHaveBeenCalledWith('services', [
        {
          _id: 0,
          status: 'inactive',
        },
        {
          _id: 1,
          status: 'active',
        },
      ])
    })
  })

  it('change about input field', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    const args = 'a'

    wrapper
      .find(getTestID`aboutInput`)
      .props()
      .onChange(args)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('about', args)
  })

  it('render service item', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const args = {
      item: {
        _id: 0,
        title: 'title',
        status: 'active',
      },
    }

    wrapper.instance().handleEdit = jest.fn()
    wrapper.instance().handleDelete = jest.fn()
    wrapper.instance().handleOpenDialog = jest.fn()
    wrapper.instance().handleCloseDialog = jest.fn()
    wrapper.instance().handleToggleActive = jest.fn()

    const serviceComponent = wrapper.instance().renderService(args)

    serviceComponent.props.onEdit()

    expect(wrapper.instance().handleEdit).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleEdit).toHaveBeenCalledWith(args.item)

    serviceComponent.props.onDelete()

    expect(wrapper.instance().handleEdit).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleDelete).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleDelete).toHaveBeenCalledWith(args.item._id)

    serviceComponent.props.onOpenDialog()

    expect(wrapper.instance().handleEdit).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleDelete).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleOpenDialog).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleOpenDialog).toHaveBeenCalledWith(
      args.item._id,
    )

    serviceComponent.props.onCloseDialog()

    expect(wrapper.instance().handleEdit).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleDelete).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleOpenDialog).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleCloseDialog).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleCloseDialog).toHaveBeenCalledWith(
      args.item._id,
    )

    serviceComponent.props.onChangeStatus()

    expect(wrapper.instance().handleEdit).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleDelete).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleOpenDialog).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleCloseDialog).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleToggleActive).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().handleToggleActive).toHaveBeenCalledWith(
      args.item._id,
    )
  })
})
