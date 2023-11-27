import React from 'react'
import { shallow } from 'enzyme'
import { getTestID } from 'Helpers/tests'

import 'jest-styled-components'

import Component from '../Chat'

describe('Chat', () => {
  const defaultProps = {
    navigate: {
      hideModal: () => null,
    },
    data: {
      _id: 'chatId',
      messages: [
        {
          sender: 'senderID',
          _id: '2341eded',
          text: 'some message text',
          createdAt: 1571984166808,
        },
      ],
      partner: {},
    },
    user: {
      username: 'userId',
    },
    t: text => text,
    onSendMessage: () => null,
    jobTitle: 'jobTitle',
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderMessage = wrapper
      .instance()
      .renderMessage(defaultProps.data.messages[0])

    const renderMessageInvalid = wrapper.instance().renderMessage({})

    expect([wrapper, renderMessage, renderMessageInvalid]).toMatchSnapshot()
  })

  it('call scrollToBottom method', done => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().messagesList = {
      current: {
        scrollToEnd: jest.fn(),
      },
    }

    wrapper
      .find(getTestID('messagesList'))
      .props()
      .onLayout()
    expect(
      wrapper.instance().messagesList.current.scrollToEnd,
    ).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(
        wrapper.instance().messagesList.current.scrollToEnd,
      ).toHaveBeenCalledTimes(1)
      expect(
        wrapper.instance().messagesList.current.scrollToEnd,
      ).toHaveBeenCalledWith({ animated: false })
      done()
    }, 200)
  })

  it('update messages', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().messagesList = {
      current: {
        scrollToEnd: jest.fn(),
      },
    }

    wrapper.setProps({
      data: {
        ...defaultProps.data,
        messages: [
          ...defaultProps.data.messages,
          {
            sender: 'senderID',
            _id: 'fe234',
            text: 'some message text 2',
            createdAt: 1571984166608,
          },
        ],
      },
    })

    expect(
      wrapper.instance().messagesList.current.scrollToEnd,
    ).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(
        wrapper.instance().messagesList.current.scrollToEnd,
      ).toHaveBeenCalledTimes(1)
      expect(
        wrapper.instance().messagesList.current.scrollToEnd,
      ).toHaveBeenCalledWith({ animated: true })
    }, 200)
  })

  it('send message', () => {
    const props = {
      ...defaultProps,
      onSendMessage: jest.fn(),
    }

    const wrapper = shallow(<Component {...props} />)

    wrapper
      .find('ChatInput')
      .props()
      .onChangeText('  ')

    expect(wrapper.state('message')).toBe('  ')

    wrapper
      .find('ChatInput')
      .props()
      .onSend()

    expect(props.onSendMessage).not.toHaveBeenCalled()

    wrapper
      .find('ChatInput')
      .props()
      .onChangeText('new message')

    expect(wrapper.state('message')).toBe('new message')

    wrapper
      .find('ChatInput')
      .props()
      .onSend()

    expect(wrapper.state('message')).toBe('')
    expect(props.onSendMessage).toHaveBeenCalledTimes(1)
    expect(props.onSendMessage).toHaveBeenCalledWith(
      { chatId: 'chatId', message: 'new message' },
      'userId',
    )
  })
})
