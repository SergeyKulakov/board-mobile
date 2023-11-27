import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import {
  Container,
  ActionContent,
  AcceptIcon,
  RejectIcon,
  Text,
  GradientContainer,
} from './style'

const DragCardAction = ({ isReject }) => (
  <Container>
    <GradientContainer isRed={isReject}>
      <ActionContent>
        {isReject ? (
          <RejectIcon testID="rejectIcon" />
        ) : (
          <AcceptIcon testID="acceptIcon" />
        )}
        <Text>
          {isReject
            ? getTranslate('serviceProvider.reject')
            : getTranslate('serviceProvider.accept')}
        </Text>
      </ActionContent>
    </GradientContainer>
  </Container>
)

DragCardAction.propTypes = {
  isReject: PropTypes.bool,
}

export { DragCardAction }
