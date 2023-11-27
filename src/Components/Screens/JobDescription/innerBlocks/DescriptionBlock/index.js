import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import memoize from 'memoize-one'
import { withNamespaces } from 'Components/HOC'

import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'Components/UI/Icon'

import { getFormatedDate } from '../../config'
import {
  Container,
  BudgetText,
  Content,
  TopRow,
  DateBlock,
  styles,
  DateLabel,
  DateText,
  DistanceBlock,
  DistanceText,
  Description,
  DescriptionPlus,
  JobTitle,
} from './style'

const DescriptionBlock = ({
  jobTitle,
  budget,
  currency,
  description,
  isShowAllDescription,
  onShowAllDescription,
  distance,
  doneBefore,
  startDate,
  t,
  activeLanguage,
  isShowStarDate,
}) => {
  const getUnits = memoize(units => t(`jobDetail.${units}`))

  const _renderBudget = () => (
    <LinearGradient {...styles.LinearGradient}>
      <BudgetText>
        {t('findJobPage.budget')}: {budget}{' '}
        {_.isString(currency) ? currency : ''}
      </BudgetText>
    </LinearGradient>
  )

  const _renderDescription = () => {
    const isLongText = description.split(' ').length > 30

    const descriptionText =
      !isShowAllDescription && isLongText
        ? `${description
            .split(' ')
            .slice(0, 20)
            .join(' ')}...`
        : description

    return (
      <Description>
        {descriptionText}
        {!isShowAllDescription && isLongText && (
          <DescriptionPlus onPress={onShowAllDescription}>[+]</DescriptionPlus>
        )}
      </Description>
    )
  }

  const date = isShowStarDate && startDate ? startDate : doneBefore

  return (
    <Container>
      {_renderBudget()}
      <Content>
        <DateBlock>
          <DateLabel>
            {isShowStarDate
              ? t('myJobsDetail.appointmentScheduledFor')
              : t('findJobPage.needDoneBefore')}
            :
          </DateLabel>
          <TopRow>
            <DateText>{getFormatedDate(date)}</DateText>
            {!_.isEmpty(distance) && (
              <DistanceBlock>
                <Icon {...styles.DistanceIcon} />
                <DistanceText>
                  {distance.length.toFixed(1)}{' '}
                  {getUnits(distance.units, activeLanguage)}
                </DistanceText>
              </DistanceBlock>
            )}
          </TopRow>
          <JobTitle>{jobTitle}</JobTitle>
        </DateBlock>

        {description && _renderDescription()}
      </Content>
    </Container>
  )
}

DescriptionBlock.propTypes = {
  date: PropTypes.string,
  currency: PropTypes.string,
  budget: PropTypes.number,
  startDate: PropTypes.string,
  description: PropTypes.string,
  jobTitle: PropTypes.string,
  isShowAllDescription: PropTypes.bool,
  t: PropTypes.func,
  distanceData: PropTypes.shape({
    distance: PropTypes.number,
    metric: PropTypes.string,
  }),
  activeLanguage: PropTypes.string,
  onShowAllDescription: PropTypes.func.isRequired,
  isShowStarDate: PropTypes.bool,
}

export default withNamespaces(DescriptionBlock)
