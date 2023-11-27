import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Text, TextWrapper, Container } from './style'

const ServicesWrapRow = ({ data, t }) => {
  if (!_.isArray(data) || _.isEmpty(data)) return null

  return (
    <Container>
      {data.map(el => (
        <TextWrapper key={el._id}>
          <Text>{t(`services.${el.title}`)}</Text>
        </TextWrapper>
      ))}
    </Container>
  )
}

ServicesWrapRow.propTypes = {
  data: PropTypes.array,
  t: PropTypes.func,
}

export default ServicesWrapRow
