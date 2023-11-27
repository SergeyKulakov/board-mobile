import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'

import 'jest-styled-components'

import { SocialButton } from 'Components/Blocks'
import Component from '../SocialAuthBlock'

describe('SocialAuthBlock', () => {
  const defaultProps = {
    toast: () => null,
    onFederatedSignIn: () => null,
    getError: () => null,
  }

  it('render snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('call federation sign in', () => {
    it('should call onFederatedSignIn', () => {
      const props = {
        ...defaultProps,
        onFederatedSignIn: jest.fn(),
        toast: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      expect(props.onFederatedSignIn).not.toHaveBeenCalled()
      expect(props.toast).not.toHaveBeenCalled()

      const response = { url: 'url' }

      wrapper.instance().handleUrl(response)

      expect(props.onFederatedSignIn).toHaveBeenCalledTimes(1)
    })
    it('successful federation sign in', done => {
      const props = {
        ...defaultProps,
        onFederatedSignIn: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback({})
          }, 1000)
        }),
        toast: jest.fn(),
        getError: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const response = { url: 'url' }

      wrapper.instance().handleUrl(response)

      expect(props.onFederatedSignIn).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        expect(props.toast).not.toHaveBeenCalled()
        expect(props.getError).not.toHaveBeenCalled()
        expect(props.onFederatedSignIn).toHaveBeenCalledTimes(1)
        done()
      }, 1100)
    })

    it('failure federation sign in', done => {
      const data = {
        error: {
          payload: {
            code: 'some code',
          },
        },
      }
      const props = {
        ...defaultProps,
        onFederatedSignIn: jest.fn(({ callback }) => {
          setTimeout(() => {
            callback(data)
          }, 1000)
        }),
        toast: jest.fn(),
        getError: jest.fn(),
      }

      const wrapper = shallow(<Component {...props} />)

      const response = { url: 'url' }

      wrapper.instance().handleUrl(response)

      expect(props.onFederatedSignIn).toHaveBeenCalledTimes(1)
      expect(props.toast).not.toHaveBeenCalled()
      expect(props.getError).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(props.toast).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledTimes(1)
        expect(props.getError).toHaveBeenCalledWith(data.error)
        expect(props.onFederatedSignIn).toHaveBeenCalledTimes(1)
        done()
      }, 1100)
    })
  })

  it('SocialButton press', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    wrapper.instance().handleLinkClick = jest.fn()

    chai.expect(wrapper.find(SocialButton)).to.lengthOf(3)

    expect(wrapper.instance().handleLinkClick).not.toHaveBeenCalled()

    wrapper.find(SocialButton).forEach(el => {
      el.props().onClick()
    })

    expect(wrapper.instance().handleLinkClick).toHaveBeenCalledTimes(3)
  })
})
