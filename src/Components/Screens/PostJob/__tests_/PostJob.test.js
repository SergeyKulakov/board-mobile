import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../PostJob'

describe('PostJob', () => {
  const defaultProps = {
    errors: {},
    handleBlur: () => null,
    handleChange: () => null,
    handleSubmit: () => null,
    isEditMode: false,
    job: {},
    navigate: {},
    setFieldTouched: () => null,
    setFieldValue: () => null,
    setValues: () => null,
    submitCount: 0,
    touched: {},
    user: {
      email_verified: 'true',
      phone_number_verified: 'true',
      isPremium: false,
    },
    values: {
      pics: [],
      currencyCode: 'USD',
    },
    onCreateJob: () => null,
    onUpdateJob: () => null,
    onShowPuck: () => null,
    isShowPack: false,
    t: text => text,
    componentId: 'componentId',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderButtons = wrapper.instance().renderButtons()

    const renderVideoLinks = wrapper.instance().renderVideoLinks()

    const renderPics = wrapper.instance().renderPics()

    const renderDates = wrapper.instance().renderDates()

    const renderInfo = wrapper.instance().renderInfo()

    const renderServices = wrapper.instance().renderServices()

    const renderLocations = wrapper.instance().renderLocations()

    expect([
      wrapper,
      renderButtons,
      renderVideoLinks,
      renderPics,
      renderDates,
      renderInfo,
      renderServices,
      renderLocations,
    ]).toMatchSnapshot()
  })

  it('should get correct key', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(
      wrapper
        .find('SectionList')
        .props()
        .keyExtractor({ key: 'key' }),
    ).toBe('key')
  })

  it('set expiry date', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.setFieldValue).not.toHaveBeenCalled()

    const args = 'new date'

    wrapper.instance().handleSetExpiryDate(args)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('expiryDate', args)
  })

  it('set done before date', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.setFieldValue).not.toHaveBeenCalled()

    const args = 'new date'

    wrapper.instance().handleSetBeforeDate(args)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('doneBefore', args)
  })

  it('currency modal', done => {
    const code = 'USU'
    const props = {
      ...defaultProps,
      navigate: {
        showModal: jest.fn((route, { onSubmit }) => {
          setTimeout(() => {
            onSubmit({ code })
          }, 1000)
        }),
      },
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    expect(props.navigate.showModal).not.toHaveBeenCalled()

    wrapper.instance().handleOpenCurrencyModal()

    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      expect(props.setFieldValue).toHaveBeenCalledWith('currencyCode', code)
      done()
    }, 1100)
  })

  it('should delete image', () => {
    const props = {
      ...defaultProps,
      values: {
        ...defaultProps.values,
        pics: [{ image: '123412weqwe', id: 0 }],
      },
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleDeleteImage(0)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('pics', [])
  })

  it('should video link', () => {
    const props = {
      ...defaultProps,
      values: {
        ...defaultProps.values,
        videoLinks: [{ title: 'title', id: 0 }],
      },
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleDeleteVideoLink(0)

    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('videoLinks', [])
  })

  describe('save video link', () => {
    const args = {
      link: 'link',
      images: [{ id: 0 }, { id: 2 }],
      title: 'title',
      description: 'description',
    }
    const getProps = isPremium => ({
      ...defaultProps,
      setFieldValue: jest.fn(),
      user: {
        ...defaultProps.user,
        isPremium,
      },
      navigate: {
        ...defaultProps.navigate,
        showMessage: jest.fn(),
      },
      values: {
        ...defaultProps.values,
        videoLinks: [],
      },
    })
    it('not called by default', () => {
      const props = getProps(false)

      shallow(<Component {...props} />)

      expect(props.navigate.showMessage).not.toHaveBeenCalled()
      expect(props.setFieldValue).not.toHaveBeenCalled()
    })

    it('free plan', () => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      for (let i = 0; i < 5; i++) {
        wrapper.instance().handleSaveVideoLink(args)
        if (i === 0) {
          wrapper.setProps({
            values: {
              ...props.values,
              videoLinks: [...props.values.videoLinks, args],
            },
          })
        }
      }

      expect(props.navigate.showMessage).toHaveBeenCalledTimes(4)
      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    })

    it('premium plan', () => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      for (let i = 0; i < 5; i++) {
        wrapper.instance().handleSaveVideoLink(args)
        wrapper.setProps({
          values: {
            ...props.values,
            videoLinks: [...props.values.videoLinks, args],
          },
        })
      }

      expect(props.setFieldValue).toHaveBeenCalledTimes(5)
      expect(props.navigate.showMessage).not.toHaveBeenCalled()
    })
  })

  describe('save image', () => {
    const image = '121413rqwefr3f3f3rf'
    const getProps = isPremium => ({
      ...defaultProps,
      setFieldValue: jest.fn(),
      user: {
        ...defaultProps.user,
        isPremium,
      },
      onShowPuck: jest.fn(),
      values: {
        ...defaultProps.values,
        pics: [
          { image: '12141e12f13f', id: 0 },
          { image: '12141fl;aknv;flkn13f', id: 1 },
        ],
      },
    })

    it('not called by default', () => {
      const props = getProps(false)

      shallow(<Component {...props} />)

      expect(props.onShowPuck).not.toHaveBeenCalled()
      expect(props.setFieldValue).not.toHaveBeenCalled()
    })

    it('free plan', () => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)
      for (let i = 0; i < 10; i++) {
        wrapper.instance().handleSaveImage(image)
        if (i < 3) {
          wrapper.setProps({
            values: {
              ...wrapper.instance().props.values,
              pics: [
                ...wrapper.instance().props.values.pics,
                { image, id: wrapper.instance().props.values.pics.length },
              ],
            },
          })
        }
      }

      expect(props.setFieldValue).toHaveBeenCalledTimes(3)
      expect(props.onShowPuck).toHaveBeenCalledTimes(7)
    })

    it('premium plan', () => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)
      for (let i = 0; i < 51; i++) {
        wrapper.instance().handleSaveImage(image)
        if (i < 48) {
          wrapper.setProps({
            values: {
              ...wrapper.instance().props.values,
              pics: [
                ...wrapper.instance().props.values.pics,
                { image, id: wrapper.instance().props.values.pics.length },
              ],
            },
          })
        }
      }

      expect(props.setFieldValue).toHaveBeenCalledTimes(48)
      expect(props.onShowPuck).toHaveBeenCalledTimes(3)
    })
  })

  it('change location', () => {
    const props = {
      ...defaultProps,
      setFieldValue: jest.fn(),
      setValues: jest.fn(),
      values: {
        ...defaultProps.values,
        lat: undefined,
        lon: undefined,
      },
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleChangeLocation('address', 'Deribas')

    expect(props.setValues).not.toHaveBeenCalled()
    expect(props.setFieldValue).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledWith('address', 'Deribas')

    wrapper.setProps({
      values: {
        ...wrapper.instance().props.values,
        lat: 12.324,
        lon: 12.213,
      },
    })

    wrapper.instance().handleChangeLocation('address', 'Deribaso')

    expect(props.setValues).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledTimes(2)
    expect(props.setFieldValue).toHaveBeenCalledWith('address', 'Deribaso')

    wrapper.setProps({
      values: {
        ...wrapper.instance().props.values,
        lat: 12.324,
        lon: 12.213,
      },
    })

    wrapper.instance().handleChangeLocation('zipCode', '134')

    expect(props.setValues).toHaveBeenCalledTimes(1)
    expect(props.setFieldValue).toHaveBeenCalledTimes(3)
    expect(props.setFieldValue).toHaveBeenCalledWith('zipCode', '134')
  })

  it('open map', done => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        showModal: jest.fn((route, { onSubmit }) => {
          setTimeout(() => {
            onSubmit()
          }, 1100)
        }),
      },
    }

    const wrapper = shallow(<Component {...props} />)
    wrapper.instance().setLocation = jest.fn()

    wrapper.instance().handleOpenMap()

    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(wrapper.instance().setLocation).toHaveBeenCalledTimes(1)
      done()
    }, 1100)
  })

  it('open address modal', done => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        showModal: jest.fn((route, { onSave }) => {
          setTimeout(() => {
            onSave()
          }, 1100)
        }),
      },
    }

    const wrapper = shallow(<Component {...props} />)
    wrapper.instance().setLocation = jest.fn()

    wrapper.instance().handleOpenAddressModal()

    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(wrapper.instance().setLocation).toHaveBeenCalledTimes(1)
      done()
    }, 1100)
  })

  it('open service modal', done => {
    const props = {
      ...defaultProps,
      navigate: {
        ...defaultProps.navigate,
        showModal: jest.fn((route, { setServices }) => {
          setTimeout(() => {
            setServices([{ title: 'title', _id: '0' }])
          }, 1000)
        }),
      },
      values: {
        ...defaultProps.values,
        category: {
          title: 'title',
          _id: '123',
        },
      },
      setFieldValue: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper.instance().handleOpenServicesModal()

    expect(props.setFieldValue).not.toHaveBeenCalled()
    expect(props.navigate.showModal).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(props.setFieldValue).toHaveBeenCalledTimes(1)
      done()
    }, 1100)
  })

  it('set buttons height', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.state().buttonsWrapperHeight).toBe(100)

    const args = {
      nativeEvent: {
        layout: {
          height: 300,
        },
      },
    }

    wrapper.instance().handleSetButtonsWrapperHeight(args)

    expect(wrapper.state().buttonsWrapperHeight).toBe(300)
  })

  it('set location', () => {
    const props = {
      ...defaultProps,
      setValues: jest.fn(),
      navigate: {
        ...defaultProps.navigate,
        showMessage: jest.fn(),
      },
    }

    const wrapper = shallow(<Component {...props} />)

    const objectValue = {
      address: 'address',
      city: 'city',
      stateLong: 'stateLong',
      zipCode: 'zipCode',
      countryLong: 'countryLong',
      lat: 12.41213,
      lon: 12.41213,
    }

    wrapper.instance().setLocation(objectValue)

    expect(props.setValues).toHaveBeenCalledTimes(1)
    expect(props.navigate.showMessage).not.toHaveBeenCalled()

    const stringValue = 'string'

    wrapper.instance().setLocation(stringValue)

    expect(props.setValues).toHaveBeenCalledTimes(2)
    expect(props.navigate.showMessage).toHaveBeenCalledTimes(1)
  })
})
