import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'

import {
  Container,
  Image,
  InfoBlock,
  ImageBlock,
  Title,
  SubTitle,
} from './styles'

const SlashBlock = ({ image, title, subTitle }) => (
  <TouchableWithoutFeedback>
    <Container>
      <ImageBlock>
        <Image testID="image" source={image} resizeMode="contain" />
      </ImageBlock>
      <InfoBlock>
        <Title testID="title">{title}</Title>
        <SubTitle testID="subTitle">{subTitle}</SubTitle>
      </InfoBlock>
    </Container>
  </TouchableWithoutFeedback>
)

SlashBlock.propTypes = {
  image: PropTypes.number,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
}

export { SlashBlock }
