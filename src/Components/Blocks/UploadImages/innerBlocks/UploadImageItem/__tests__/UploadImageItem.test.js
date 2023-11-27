import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import { UploadImageItem as Component } from '../index'

describe('UploadImageItem', () => {
  const defaultProps = {
    userId: 'userId',
    id: '1234',
    image: 'image',
    type: 'type',
    link: 'link',
    isDeletable: true,
    jobImagesMode: 'jobImagesMode',
    onDelete: () => null,
    onItemClick: () => null,
    onSetLinkData: () => null,
    resizeMode: 'contain',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    const wrapper2 = shallow(<Component {...defaultProps} image={null} />)

    expect([wrapper, wrapper2]).toMatchSnapshot()
  })

  it('update image', () => {
    const props = {
      ...defaultProps,
      jobImagesMode: null,
    }
    const wrapper = shallow(<Component {...props} />)

    expect(wrapper.state('image')).toBe('image')

    wrapper.setProps({
      image: 'image2',
    })

    expect(wrapper.state('image')).toBe('image2')
  })
})
