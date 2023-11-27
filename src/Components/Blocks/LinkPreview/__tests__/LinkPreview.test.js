import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../LinkPreview'

describe('LinkPreview', () => {
  const defaultProps = {
    inputType: 'video',
    title: 'title',
    placeholder: 'placeholder',
    data: [],
    style: undefined,
    onAdd: () => null,
    onDelete: () => null,
    onBlur: () => null,
    toast: () => null,
    onSetLinkData: () => null,
    disabledLoading: false,
    orientation: 'orientation',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const renderHeaderComponent = wrapper.instance().renderHeaderComponent()
    const renderItem = wrapper.instance().renderItem({
      item: {
        link: 'link',
        id: 2,
        image: 'image',
        info: 'info',
      },
    })

    expect([wrapper, renderHeaderComponent, renderItem]).toMatchSnapshot()
  })

  it('call modal actions', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().handleAddLink = jest.fn()

    wrapper
      .find(getTestID('InputModal'))
      .props()
      .onSubmit()
    wrapper
      .find(getTestID('InputModal'))
      .props()
      .onEndEditing()

    expect(wrapper.instance().handleAddLink).toHaveBeenCalledTimes(2)
  })

  it('get keyExtractor', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(
      wrapper
        .find(getTestID('FlatList'))
        .props()
        .keyExtractor({ link: 'link' }),
    ).toBe('link')
  })

  it('add link method', async () => {
    const props = {
      ...defaultProps,
      onAdd: jest.fn(),
      inputType: 'video',
      toast: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleCloseModal = jest.fn()

    const args = 'https://www.google.com'

    await wrapper.instance().handleAddLink(args)

    expect(wrapper.instance().handleCloseModal).toHaveBeenCalledTimes(1)

    expect(props.onAdd).toHaveBeenCalledTimes(1)
  })

  it('youtube', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const link = 'https://www.youtube.com?v=12342'

    wrapper.instance().handleOpenLink(link)

    expect()
  })
})
