import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'Components/HOC'

import { IconButton } from 'Components/UI'

import { getFormatedDate } from './config'
import {
  Container,
  Text,
  Content,
  Label,
  InfoContainer,
  InfoColumn,
  Wrapper,
  Footer,
  TextLink,
  styles,
} from './style'

const InfoBlock = ({
  isShowAddress,
  category,
  subCategory,
  createdDate,
  jobId,
  isShowChat,
  isChatLoading,
  onClickChat,
  onClickSeeMap,
  address,
  city,
  state,
  country,
  zipCode,
  t,
}) => {
  const _renderItem = (label, value) => (
    <InfoContainer>
      <Label>{label}</Label>
      <Text>{value}</Text>
    </InfoContainer>
  )

  return (
    <Wrapper>
      <Container>
        <Content>
          <InfoColumn>
            {_renderItem(
              t('jobDetail.jobCreatedOn'),
              getFormatedDate(createdDate),
            )}
            {_renderItem(t('jobDetail.jobId'), jobId)}
          </InfoColumn>
          <InfoColumn>
            {_renderItem(t('jobDetail.category'), t(`services.${category}`))}
            {subCategory
              ? _renderItem(
                  t('jobDetail.subCategory'),
                  t(`services.${subCategory}`),
                )
              : null}
          </InfoColumn>
        </Content>
        {isShowChat ? (
          <IconButton
            icon={styles.ChatIcon}
            loading={isChatLoading}
            onClick={onClickChat}
          />
        ) : null}
      </Container>
      {isShowAddress ? (
        <Footer>
          <InfoColumn>
            <Label>{t('landingPage.fields.address')}</Label>
            <Text>{address}</Text>
            <Text>{state}</Text>
            <Text>{country}</Text>
            <Text>
              {city} - {zipCode}
            </Text>
            <TextLink onPress={onClickSeeMap}>
              {t('myJobsDetail.seeAddressOnMap')}
            </TextLink>
          </InfoColumn>
        </Footer>
      ) : null}
    </Wrapper>
  )
}

InfoBlock.propTypes = {
  address: PropTypes.string,
  category: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  createdDate: PropTypes.string,
  isShowAddress: PropTypes.bool,
  jobId: PropTypes.string,
  state: PropTypes.string,
  subCategory: PropTypes.string,
  t: PropTypes.func,
  zipCode: PropTypes.string,
  onClickChat: PropTypes.func,
  onClickSeeMap: PropTypes.func,
  isChatLoading: PropTypes.bool,
  isShowChat: PropTypes.bool,
}

export default withNamespaces(InfoBlock)
