import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Image } from 'Components/UI'

import { Container, MoreImagesText, MoreImagesContaienr, styles } from './style'

class PicsOfWork extends Component {
  shouldComponentUpdate(nextProps) {
    const { data } = this.props
    return !_.isEqual(nextProps.data, data)
  }

  render() {
    const { data, onClick } = this.props

    if (_.isEmpty(data)) return null

    return data.slice(0, 3).map((el, index) =>
      index === 2 ? (
        <Container
          testID="lastItem"
          key={el}
          {...styles.getImageStyle()}
          onPress={onClick}
        >
          <Image data={el} withLoading resizeMode="cover">
            <MoreImagesContaienr>
              <MoreImagesText>+{data.length - 3}</MoreImagesText>
            </MoreImagesContaienr>
          </Image>
        </Container>
      ) : (
        <Container
          testID="item"
          key={el}
          {...styles.getImageStyle()}
          onPress={() => onClick(index)}
        >
          <Image data={el} withLoading resizeMode="cover" />
        </Container>
      ),
    )
  }
}

PicsOfWork.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export { PicsOfWork }
