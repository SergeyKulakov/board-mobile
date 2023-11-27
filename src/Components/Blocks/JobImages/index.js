import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'Components/UI'

import config from './config'
import {
  Container,
  BigImageContainer,
  ImageContainer,
  ImagesColumn,
  MoreContainer,
  MoreText,
} from './style'

const JobImages = ({ data, onClickItem, onClickMore }) => {
  const renderImage = (source, count) => (
    <Image
      {...config.defaultImageProps}
      data={source}
      onClick={() => onClickItem(count)}
    >
      {count === 4 && data[count + 1] ? (
        <MoreContainer onPress={onClickMore}>
          <MoreText>+{data.length - 5}</MoreText>
        </MoreContainer>
      ) : null}
    </Image>
  )

  return (
    <Container>
      <BigImageContainer>{renderImage(data[0], 0)}</BigImageContainer>
      {data[1] && (
        <ImagesColumn>
          {data[1] && (
            <ImageContainer>{renderImage(data[1], 1)}</ImageContainer>
          )}
          {data[2] && (
            <ImageContainer mt={1}>{renderImage(data[2], 2)}</ImageContainer>
          )}
        </ImagesColumn>
      )}
      {data[3] && (
        <ImagesColumn>
          {data[3] && (
            <ImageContainer>{renderImage(data[3], 3)}</ImageContainer>
          )}
          {data[4] && (
            <ImageContainer mt={1}>{renderImage(data[4], 4)}</ImageContainer>
          )}
        </ImagesColumn>
      )}
    </Container>
  )
}

JobImages.propTypes = {
  data: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
  onClickMore: PropTypes.func,
}

export { JobImages }
