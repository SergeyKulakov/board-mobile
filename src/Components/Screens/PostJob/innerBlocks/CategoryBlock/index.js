import React from 'react'
import PropTypes from 'prop-types'

import { TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'Components/UI'
import { Container, TextContainer, Title, SubTitle, styles } from './style'

const CategoryBlock = ({ title, subTitle, isError, onClick }) => (
  <TouchableWithoutFeedback onPress={onClick}>
    <Container>
      <TextContainer>
        <Title error={isError}>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </TextContainer>
      <Icon {...styles.ArrowIcon} />
    </Container>
  </TouchableWithoutFeedback>
)

CategoryBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  isError: PropTypes.bool,
  onClick: PropTypes.func,
}

export { CategoryBlock }
