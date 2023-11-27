import React from 'react'
import { shallow } from 'enzyme'

import 'jest-styled-components'

import Component from '../Chats'

describe('Chats', () => {
  const defaultProps = {
    navigate: {
      showSidebar: () => null,
      pop: () => null,
    },
    onShowPuck: () => null,
    data: [],
    onLoadChats: () => null,
    chats: [],
    user: {
      username: 'userId',
    },
    onConnectToChat: () => null,
    loadChatUsername: null,
    onShowAd: () => null,
    isAdsLoading: false,
    t: text => text,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    const renderHideActions = wrapper
      .instance()
      .renderHideActions({ item: {} }, 'rowMap')

    const renderHideActionsString = wrapper
      .instance()
      .renderHideActions({ item: 'ads' }, 'rowMap')

    const renderChatCard = wrapper.instance().renderChatCard({
      item: {
        partner: {
          username: 'partnerId',
        },
      },
    })

    const renderChatCardString = wrapper
      .instance()
      .renderChatCard({ item: 'ads' })

    expect([
      wrapper,
      renderHideActions,
      renderHideActionsString,
      renderChatCard,
      renderChatCardString,
    ]).toMatchSnapshot()
  })

  describe('load chats', () => {
    const getProps = isSuccessful => ({
      ...defaultProps,
      onShowPuck: jest.fn(),
      getError: jest.fn(),
      onLoadChats: jest.fn(callback => {
        setTimeout(() => {
          callback({
            error: isSuccessful
              ? undefined
              : { payload: { code: 'some error code' } },
          })
        }, 1000)
      }),
    })

    it('successful', done => {
      const props = getProps(true)

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.onLoadChats).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.onShowPuck).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()

        done()
      }, 1100)
    })

    it('failure', done => {
      const props = getProps(false)

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.state('isRequest')).toBe(true)
      expect(props.onLoadChats).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(wrapper.state('isRequest')).toBe(false)
        expect(props.onShowPuck).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith({
          payload: { code: 'some error code' },
        })

        done()
      }, 1100)
    })
  })

  describe('open chat', () => {
    it('with request', () => {
      const props = {
        ...defaultProps,
        onConnectToChat: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.state('isRequest')).toBe(true)

      wrapper.instance().handleOpenChat({
        users: ['partnerId', 'userId'],
        _id: '123qwds',
      })

      expect(props.onConnectToChat).not.toHaveBeenCalled()
    })

    it('invalid request', () => {
      const props = {
        ...defaultProps,
        onConnectToChat: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(wrapper.state('isRequest')).toBe(true)

      wrapper.instance().handleOpenChat({
        users: [],
        _id: '123qwds',
      })

      expect(props.onConnectToChat).not.toHaveBeenCalled()
    })

    it('call connect to chat', () => {
      const props = {
        ...defaultProps,
        onConnectToChat: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      wrapper.setState({ isRequest: false })

      wrapper.instance().handleOpenChat({
        users: ['partnerId', 'userId'],
        _id: '123qwds',
      })

      expect(props.onConnectToChat).toHaveBeenCalledTimes(1)
      expect(props.onConnectToChat).toHaveBeenCalledWith('partnerId')
    })
  })
})
