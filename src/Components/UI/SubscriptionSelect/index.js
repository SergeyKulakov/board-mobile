import React from 'react'
import PropTypes from 'prop-types'

import {
  Wrapper,
  Part,
  Value,
  IncrementButtonsWrapper,
  UpButton,
  DownButton,
} from './style'

const SubscriptionSelect = ({ min, value, onIncrement, onDecrement }) => (
  <Wrapper>
    <Part />
    <Part>
      <Value>{String(value)}</Value>
    </Part>
    <Part>
      <IncrementButtonsWrapper>
        <UpButton onClick={onIncrement} />
        <DownButton disabled={min >= value} onClick={onDecrement} />
      </IncrementButtonsWrapper>
    </Part>
  </Wrapper>
)

SubscriptionSelect.propTypes = {
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.number,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
}

export { SubscriptionSelect }
