import React from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'

import { ScreenHeader, TabNavigationElement, Hamburger } from 'Components/UI'

import {
  Container,
  Top,
  Left,
  Middle,
  Right,
  ScreenTitle,
  BackButton,
  TabsWrapper,
  FilterIcon,
  SortButton,
  SearchButton,
} from './style'

const Header = ({
  activeTabIndex,
  isShowFilters,
  onChangeTab,
  onBackClick,
  onHamburgerClick,
  onFilterClick,
  onClickSortButton,
  onSearchClick,
}) => (
  <ScreenHeader>
    <Container>
      <Top>
        <Left>
          <BackButton onClick={onBackClick} />
          <Hamburger onClick={onHamburgerClick} />
        </Left>
        <Middle>
          <ScreenTitle>{getTranslate('headerBlock.menu.myJobs')}</ScreenTitle>
        </Middle>
        <Right>
          {isShowFilters ? (
            <>
              <SearchButton onClick={onSearchClick} />
              <FilterIcon onClick={onFilterClick} />
            </>
          ) : null}
          <SortButton onClick={onClickSortButton} />
        </Right>
      </Top>
      <TabsWrapper>
        <TabNavigationElement
          isActive={activeTabIndex === 0}
          onClick={() => onChangeTab(0)}
        >
          {getTranslate('headerBlock.postedJobs')}
        </TabNavigationElement>
        <TabNavigationElement
          isActive={activeTabIndex === 1}
          onClick={() => onChangeTab(1)}
        >
          {getTranslate('headerBlock.appliedJobs')}
        </TabNavigationElement>
        <TabNavigationElement
          isActive={activeTabIndex === 2}
          onClick={() => onChangeTab(2)}
        >
          {getTranslate('headerBlock.bookedJobs')}
        </TabNavigationElement>
      </TabsWrapper>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  activeTabIndex: PropTypes.number,
  isShowFilters: PropTypes.bool,
  onBackClick: PropTypes.func,
  onChangeTab: PropTypes.func,
  onHamburgerClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  onClickSortButton: PropTypes.func,
  onSearchClick: PropTypes.func,
}

export { Header }
