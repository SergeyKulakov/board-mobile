import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import {
  ScreenHeader,
  TabNavigationElement,
  BackIcon,
  Hamburger,
} from 'Components/UI'

import {
  Container,
  Right,
  Middle,
  Left,
  Top,
  BackIconWrapper,
  Title,
  TabsWrapper,
} from './style'

const Header = ({
  activeTabIndex,
  onBackClick,
  onHamburgerClick,
  onClickTab,
}) => (
  <ScreenHeader>
    <Container>
      <Top>
        <Left>
          <BackIconWrapper>
            <BackIcon onClick={onBackClick} />
          </BackIconWrapper>
          <Hamburger onClick={onHamburgerClick} />
        </Left>
        <Middle>
          <Title>{getTranslate('headerBlock.menu.myFavourites')}</Title>
        </Middle>
        <Right />
      </Top>
      <TabsWrapper>
        <TabNavigationElement
          isActive={activeTabIndex === 0}
          onClick={() => onClickTab(0)}
        >
          {getTranslate('headerBlock.jobs')}
        </TabNavigationElement>
        <TabNavigationElement
          isActive={activeTabIndex === 1}
          onClick={() => onClickTab(1)}
        >
          {getTranslate('headerBlock.serviceProviders')}
        </TabNavigationElement>
      </TabsWrapper>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  activeTabIndex: PropTypes.oneOf([0, 1]),
  onBackClick: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  onClickTab: PropTypes.func,
}

export { Header }
