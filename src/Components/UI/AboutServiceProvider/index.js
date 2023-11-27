import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getTranslate } from 'Helpers/languages'

import { StarsIcon, DistanceIcon, CommentsIcon } from '../IconsInfo'
import { MoreText } from '../MoreText'

import {
  Container,
  Header,
  JobsDone,
  JobsDoneCount,
  Right,
  CommentsIconWrapper,
  StarsIconWrapper,
  DistanceIconWrapper,
  Content,
  Left,
} from './style'

const AboutServiceProvider = ({
  jobsDoneCount,
  stars,
  comments,
  distance,
  description,
  onCommentsClick,
}) => (
  <Container>
    <Header>
      <Left>
        <JobsDoneCount>{jobsDoneCount || 0}</JobsDoneCount>
        <JobsDone>{getTranslate('serviceProvider.jobsDone')}</JobsDone>
      </Left>
      <Right>
        <StarsIconWrapper>
          <StarsIcon value={stars} />
        </StarsIconWrapper>
        <CommentsIconWrapper onPress={onCommentsClick}>
          <CommentsIcon value={comments} />
        </CommentsIconWrapper>
        <DistanceIconWrapper>
          <DistanceIcon
            value={_.get(distance, 'length', 0)}
            units={_.get(distance, 'units', 'kilometre')}
            icon={{ size: 15 }}
          />
        </DistanceIconWrapper>
      </Right>
    </Header>
    {_.isString(description) ? (
      <Content>
        <MoreText>{description}</MoreText>
      </Content>
    ) : null}
  </Container>
)

AboutServiceProvider.propTypes = {
  comments: PropTypes.number,
  distance: PropTypes.object,
  jobsDoneCount: PropTypes.number,
  stars: PropTypes.number,
  description: PropTypes.string,
  onCommentsClick: PropTypes.func,
}

export { AboutServiceProvider }
