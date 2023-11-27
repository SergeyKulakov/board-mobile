import styled from 'styled-components/native'
import { colors } from 'Themes'
import { flex, space, width, opacity } from 'styled-system'
import { Icon } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`

export const TopContainer = styled.View`
  margin-top: 5;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10;
`

export const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15;
`

export const Block = styled.View`
  flex: 1;
  padding-top: 10;
  padding-bottom: 10;
  ${flex};
  ${space};
  ${width};
  ${opacity};
`

export const Right = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  flex-direction: row;
  align-items: center;
`

export const SortIcon = styled(Icon).attrs(() => ({
  type: 'mci',
  name: 'sort',
  color: colors.white,
  size: 23,
}))`
  margin-bottom: -2;
`

export const FilterContainer = styled.View`
  position: relative;
  margin-left: 15;
  margin-right: 15;
`

export const styles = {
  SearchIcon: {
    name: 'search',
    color: colors.white,
  },
  FilterIcon: {
    name: 'filter',
    color: colors.white,
  },
  Title: {
    textAlign: 'center',
  },
}
