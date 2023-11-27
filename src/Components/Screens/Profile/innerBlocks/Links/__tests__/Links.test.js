import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import { Links as Component } from '../index'

describe('Profile.Links', () => {
  const defaultProps = {
    text: {
      videoLinksLengthError: 'videoLinksLengthError',
      websiteLinksLengthErrorFree: 'websiteLinksLengthErrorFree',
      websiteLinksLengthErrorPremium: 'websiteLinksLengthErrorPremium',
    },
    values: {
      videoLinks: [],
      websiteLinks: [],
    },
    setFieldValue: () => null,
    toast: () => null,
    isPremium: false,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('add video links', () => {
    describe('successful', () => {
      it('without premium & without other video links', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
        }

        const wrapper = shallow(<Component {...props} />)

        const key = 'videoLinks'
        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('videoLinks'))
          .props()
          .onAdd(args)

        expect(props.toast).not.toHaveBeenCalled()
        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledWith(
          key,
          props.values.videoLinks.concat([
            {
              id: props.values.videoLinks.length + 1,
              link: args.link,
              image: args.image,
              info: args.title,
            },
          ]),
        )
      })
      it('with premium', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
          values: {
            videoLinks: [
              {
                id: 1,
                link: 'https://google.com',
                image: '14102389470398r1039r3',
                info: 'title',
              },
            ],
          },
          isPremium: true,
        }

        const wrapper = shallow(<Component {...props} />)

        const key = 'videoLinks'
        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('videoLinks'))
          .props()
          .onAdd(args)

        expect(props.toast).not.toHaveBeenCalled()
        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledWith(
          key,
          props.values.videoLinks.concat([
            {
              id: props.values.videoLinks.length + 1,
              link: args.link,
              image: args.image,
              info: args.title,
            },
          ]),
        )
      })
    })

    describe('failure add video link [permissions]', () => {
      it('without premium', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
          values: {
            videoLinks: [
              {
                id: 1,
                link: 'https://google.com',
                image: '14102389470398r1039r3',
                info: 'title',
              },
            ],
          },
          isPremium: false,
        }

        const wrapper = shallow(<Component {...props} />)

        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('videoLinks'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).not.toHaveBeenCalled()
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          props.text.videoLinksLengthError,
        )
      })
    })
  })

  describe('add website links', () => {
    describe('successful', () => {
      it('without premium', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
          isPremium: false,
          values: {
            ...defaultProps.values,
            websiteLinks: [],
          },
        }

        const wrapper = shallow(<Component {...props} />)

        const key = 'websiteLinks'
        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('websiteLinks'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledWith(key, [
          {
            id: 1,
            link: args.link,
            image: args.image,
            info: args.title,
          },
        ])
      })

      it('with premium', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
          isPremium: true,
          values: {
            ...defaultProps.websiteLinks,
            websiteLinks: [
              {
                id: 1,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
              {
                id: 2,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
              {
                id: 3,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
            ],
          },
        }

        const wrapper = shallow(<Component {...props} />)

        const key = 'websiteLinks'
        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('websiteLinks'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).toHaveBeenCalledTimes(1)
        expect(props.setFieldValue).toHaveBeenCalledWith(
          key,
          props.values.websiteLinks.concat([
            {
              id: 4,
              link: args.link,
              image: args.image,
              info: args.title,
            },
          ]),
        )
      })
    })

    describe('failure', () => {
      it('without premium', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
          isPremium: false,
          values: {
            websiteLinks: [
              {
                id: 1,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
            ],
          },
        }

        const wrapper = shallow(<Component {...props} />)

        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('websiteLinks'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).not.toHaveBeenCalled()
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          props.text.websiteLinksLengthErrorFree,
        )
      })

      it('with premium', () => {
        const props = {
          ...defaultProps,
          setFieldValue: jest.fn(),
          toast: jest.fn(),
          isPremium: true,
          values: {
            ...defaultProps.values,
            websiteLinks: [
              {
                id: 1,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
              {
                id: 2,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
              {
                id: 3,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
              {
                id: 4,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
              {
                id: 5,
                link: 'https://youtobe.com',
                image: '83270491823u01uifr0iuh0eiv',
                info: 'description',
              },
            ],
          },
        }

        const wrapper = shallow(<Component {...props} />)

        const args = {
          link: 'https://youtobe.com',
          image: '83270491823u01uifr0iuh0eiv',
          title: 'title',
          description: 'description',
        }

        wrapper
          .find(getTestID('websiteLinks'))
          .props()
          .onAdd(args)

        expect(props.setFieldValue).not.toHaveBeenCalled()
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.toast).toHaveBeenCalledWith(
          props.text.websiteLinksLengthErrorPremium,
        )
      })
    })
  })
  it('delete link', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.setFieldValue).not.toHaveBeenCalled()

    for (let i = 0; i < wrapper.find('LinkPreview').length; i++) {
      wrapper
        .find('LinkPreview')
        .get(i)
        .props.onDelete({})
    }

    expect(props.setFieldValue).toHaveBeenCalledTimes(2)
  })
})
