import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { Icon } from '../Icon'
import { GradientContainer } from '../GradientContainer'

import { Container, ActionButton, ActionContent, styles } from './style'

const RightActionsJobCard = ({
  isActiveFavorite,
  loading,
  isFavouriteCallable,
  onFavoriteClick,
  onShareClick,
}) => (
  <Container>
    <GradientContainer>
      <ActionContent>
        <TouchableOpacity
          onPress={onFavoriteClick}
          disabled={!isFavouriteCallable}
        >
          <ActionButton>
            <Icon
              {...styles.getHeartIcon(isActiveFavorite, !isFavouriteCallable)}
              loading={loading}
            />
          </ActionButton>
        </TouchableOpacity>

        <TouchableOpacity onPress={onShareClick}>
          <ActionButton>
            <Icon {...styles.IconShare} />
          </ActionButton>
        </TouchableOpacity>
      </ActionContent>
    </GradientContainer>
  </Container>
)

RightActionsJobCard.propTypes = {
  loading: PropTypes.bool,
  isActiveFavorite: PropTypes.bool,
  isFavouriteCallable: PropTypes.bool,
  onShareClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
}

export { RightActionsJobCard }
