import React from 'react'
import { shallow } from 'enzyme'
import { expect as chaiExpect } from 'chai'

import 'jest-styled-components'

import { Checkbox as Component } from '../index'

// todo test not runned
describe('Checkbox', () => {
  const defaultProps = {
    checked: false,
    text: 'default text',
    onChange: () => null,
  }

  it('snapshot', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be current render text', () => {
    const wrapper = shallow(<Component {...defaultProps} />)

    chaiExpect(
      wrapper
        .find('[testID="textContainer"]')
        .children()
        .text(),
    ).to.be.equal(defaultProps.text)
  })
})
