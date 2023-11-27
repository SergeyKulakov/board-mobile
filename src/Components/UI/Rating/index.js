import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Star } from './style'

const Rating = ({ value }) => (
  <Wrapper>
    {Array(5)
      .fill(1)
      .map((el, index) => (
        <Star isActive={index + 1 <= value} />
      ))}
  </Wrapper>
)

Rating.propTypes = {
  value: PropTypes.number,
}

Rating.defaultProps = {
  value: 0,
}

export { Rating }
