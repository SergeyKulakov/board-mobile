import React from 'react'
import PropTypes from 'prop-types'

import {
  ScreenHeader,
  Icon,
  TabNavigationElement,
  BackIcon,
  Hamburger,
  ScreenTitle,
} from 'Components/UI'

import { linksData } from './config'
import {
  Container,
  TopContainer,
  BottomContainer,
  Block,
  FilterContainer,
  Right,
  SortIcon,
  styles,
} from './style'

const Header = ({
  text,
  activeScreenId,
  onClickSearch,
  onClickBack,
  onClickHamburger,
  onClickFilter,
  onClickNavItem,
  onClickSort,
}) => (
  <ScreenHeader>
    <Container>
      <TopContainer>
        <Block mr={10}>
          <BackIcon onClick={onClickBack} />
        </Block>
        <Block flex={2}>
          <Hamburger onClick={onClickHamburger} />
        </Block>
        <Block flex={10}>
          <ScreenTitle style={styles.Title}>{text.title}</ScreenTitle>
        </Block>
        <Right>
          <Icon {...styles.SearchIcon} onClick={onClickSearch} />
          <FilterContainer>
            <Icon {...styles.FilterIcon} onClick={onClickFilter} />
          </FilterContainer>
          <SortIcon onClick={onClickSort} />
        </Right>
      </TopContainer>
      <BottomContainer>
        {linksData.map(el => (
          <TabNavigationElement
            key={el.key}
            title={text.getTabTitle(el.name)}
            isActive={el.key === activeScreenId}
            onClick={() => onClickNavItem(el.key)}
          />
        ))}
      </BottomContainer>
    </Container>
  </ScreenHeader>
)

Header.propTypes = {
  text: PropTypes.object.isRequired,
  activeScreenId: PropTypes.number.isRequired,
  onClickSearch: PropTypes.func,
  onClickBack: PropTypes.func.isRequired,
  onClickHamburger: PropTypes.func.isRequired,
  onClickFilter: PropTypes.func,
  onClickNavItem: PropTypes.func.isRequired,
  onClickSort: PropTypes.func,
}

export { Header }
