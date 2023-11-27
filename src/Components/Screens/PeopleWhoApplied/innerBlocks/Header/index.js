import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, TabNavigationElement, Hamburger } from 'Components/UI'

import { Container, Left, Title, BackButton, Middle, Top, Tabs } from './style'

const Header = ({
  onBackClick,
  onHamburgerClick,
  peopleCount,
  onChangeTabIndex,
  activeTabIndex,
}) => {
  return (
    <ScreenHeader>
      <Container>
        <Top>
          <Left>
            <BackButton onClick={onBackClick} />
            <Hamburger onClick={onHamburgerClick} />
          </Left>
          <Middle>
            <Title>
              {`${getTranslate(
                'appServiceProvider.totalServiceProviders',
              )} (${peopleCount})`}
            </Title>
          </Middle>
        </Top>
        <Tabs>
          <TabNavigationElement
            isActive={activeTabIndex === 0}
            onClick={() => onChangeTabIndex(0)}
          >
            {getTranslate('headerBlock.listView').toUpperCase()}
          </TabNavigationElement>
          <TabNavigationElement
            isActive={activeTabIndex === 1}
            onClick={() => onChangeTabIndex(1)}
          >
            {getTranslate('headerBlock.mapView').toUpperCase()}
          </TabNavigationElement>
        </Tabs>
      </Container>
    </ScreenHeader>
  )
}

Header.propTypes = {
  activeTabIndex: PropTypes.oneOf([0, 1]),
  onBackClick: PropTypes.func,
  onChangeTabIndex: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  peopleCount: PropTypes.number,
}

export { Header }
