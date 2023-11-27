import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../SelectDateModal'

describe('SelectDateModal', () => {
  const defaultProps = {
    budget: '1324',
    currencyCode: 'USD',
    isKeyboardShow: false,
    isVisible: true,
    t: text => text,
    user: {
      country: 'United States',
    },
    onCancel: () => null,
    onChangeBudget: () => null,
    onClickCurrency: () => null,
    onCloseKeyboard: () => null,
    onSubmit: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)
    wrapper.setState({
      date: '2019-11-04T14:23:25.285Z',
      minData: '2019-11-04T14:23:25.285Z',
    })

    const dateMode = shallow(<Component {...defaultProps} />)
    dateMode.setState({
      activeScreen: 'date',
      date: '2019-11-04T14:23:25.285Z',
      minData: '2019-11-04T14:23:25.285Z',
    })

    const renderPickerItem = wrapper
      .instance()
      .renderPickerItem({ item: 'item' })

    const timeMode = shallow(<Component {...defaultProps} />)
    timeMode.setState({
      activeScreen: 'minutes',
      date: '2019-11-04T14:23:25.285Z',
      minData: '2019-11-04T14:23:25.285Z',
    })

    const hoursMode = shallow(<Component {...defaultProps} />)
    hoursMode.setState({
      activeScreen: 'hours',
      date: '2019-11-04T14:23:25.285Z',
      minData: '2019-11-04T14:23:25.285Z',
    })

    const wrapper2 = shallow(<Component {...defaultProps} user={{}} />)
    wrapper2.setState({
      date: '2019-11-04T14:23:25.285Z',
      minData: '2019-11-04T14:23:25.285Z',
    })

    const renderSwitchMinutesPicker = wrapper2
      .instance()
      .renderSwitchMinutesPicker()

    expect([
      wrapper,
      dateMode,
      renderPickerItem,
      timeMode,
      hoursMode,
      renderSwitchMinutesPicker,
    ]).toMatchSnapshot()
  })

  it('click back icon', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.find(getTestID('BackIcon')).length).toBe(0)

    wrapper.setState({ activeScreen: 'date' })

    expect(wrapper.find(getTestID('BackIcon')).length).toBe(1)
    wrapper
      .find(getTestID('BackIcon'))
      .props()
      .onClick()

    expect(wrapper.state('activeScreen')).toBe('root')
  })

  it('click select button action', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.setState({ activeScreen: 'date' })

    wrapper
      .find(getTestID('selectButton'))
      .props()
      .onClick()

    expect(wrapper.state('activeScreen')).toBe('root')
  })

  it('switch active screen id', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper.state('activeScreen')).toBe('root')

    const { onClickDate, onClickHour, onClickMinute } = wrapper
      .find(getTestID('RootScreen'))
      .props()

    onClickDate()

    expect(wrapper.state('activeScreen')).toBe('date')

    onClickHour()

    expect(wrapper.state('activeScreen')).toBe('hours')

    onClickMinute()

    expect(wrapper.state('activeScreen')).toBe('minutes')
  })

  it('call cancel action', () => {
    const props = {
      ...defaultProps,
      onCancel: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('ButtonGroup'))
      .props()
      .onCancel()

    expect(wrapper.state('activeScreen')).toBe('root')
    expect(wrapper.state('isRequest')).toBe(false)

    expect(props.onCancel).toHaveBeenCalledTimes(1)
  })

  it('change hours', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().setState = jest.fn()

    wrapper.instance().handleChangeHours('12')

    expect(wrapper.instance().setState).toHaveBeenCalledTimes(1)
  })

  it('change minutes', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().setState = jest.fn()

    wrapper.instance().handleChangeMinutes('10')

    expect(wrapper.instance().setState).toHaveBeenCalledTimes(1)
  })

  it('call submit action', done => {
    const props = {
      ...defaultProps,
      onSubmit: jest.fn((date, callback) => {
        setTimeout(callback, 1000)
      }),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find(getTestID('ButtonGroup'))
      .props()
      .onSubmit()

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
    expect(wrapper.state('isRequest')).toBe(true)

    setTimeout(() => {
      expect(wrapper.state('isRequest')).toBe(false)

      done()
    }, 1100)
  })
})
