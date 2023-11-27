import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, TabNavigationElement, Hamburger } from 'Components/UI'

import {
  Container,
  Left,
  Middle,
  Title,
  Top,
  TabsWrapper,
  BackButton,
} from './style'

const Header = ({ activeTabId, onClickTab, onBackClick, onHamburgerClick }) => (
  <ScreenHeader>
    <Container>
      <Top>
        <Left>
          <BackButton onClick={onBackClick} />
          <Hamburger onClick={onHamburgerClick} />
        </Left>
        <Middle>
          <Title>{getTranslate('homePage.myRequests')}</Title>
        </Middle>
        <Left />
      </Top>
      <TabsWrapper>
        <TabNavigationElement
          isActive={activeTabId === 0}
          onClick={() => onClickTab(0)}
        >
          {getTranslate('homePage.bookingRequests')}
        </TabNavigationElement>
        <TabNavigationElement
          isActive={activeTabId === 1}
          onClick={() => onClickTab(1)}
        >
          {getTranslate('homePage.hiringRequests')}
        </TabNavigationElement>
      </TabsWrapper>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  activeTabId: PropTypes.number,
  onBackClick: PropTypes.func,
  onClickTab: PropTypes.func,
  onHamburgerClick: PropTypes.func,
}

export { Header }
