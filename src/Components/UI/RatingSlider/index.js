import React from 'react'
import PropTypes from 'prop-types'
import { isIos } from 'Helpers/iphoneX'

import { TouchableWithoutFeedback } from 'react-native'

import colors from './config'
import { Container, StarsIcon, LineWrapper, SectionLine, Circle } from './style'

const RatingSlider = ({ value, onChange }) => {
  const renderIosLine = (color, index) => (
    <SectionLine color={color}>
      {value === index + 1 ? <Circle /> : null}
    </SectionLine>
  )

  const renderAndroidLine = (color, index) => (
    <>
      <SectionLine color={color} />
      {value === index + 1 ? <Circle /> : null}
    </>
  )

  return (
    <Container>
      {colors.map((color, index) => (
        <TouchableWithoutFeedback
          testID="touchableField"
          key={color}
          onPress={() => onChange(index + 1)}
        >
          <LineWrapper>
            <StarsIcon value={index + 1} disabled={value < index + 1} />
            {isIos()
              ? renderIosLine(color, index)
              : renderAndroidLine(color, index)}
          </LineWrapper>
        </TouchableWithoutFeedback>
      ))}
    </Container>
  )
}

RatingSlider.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
}

export { RatingSlider }
