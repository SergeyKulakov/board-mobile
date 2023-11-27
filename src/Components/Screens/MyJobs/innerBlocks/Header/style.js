import styled from 'styled-components/native'
import { Icon, BackIcon, ScreenTitle as UIScreenTitle } from 'Components/UI'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: column;
  padding-top: 5;
  width: 100%;
`

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`

export const Left = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
`

export const BackButton = styled(BackIcon)`
  margin-right: 15;
`

export const Middle = styled.View`
  justify-content: center;
`

export const ScreenTitle = styled(UIScreenTitle)`
  text-align: center;
`

export const Right = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`

export const SortButton = styled(Icon).attrs(() => ({
  type: 'mci',
  name: 'sort',
  color: colors.white,
  size: 23,
}))`
  margin-bottom: -2;
  margin-left: 10;
`

export const TabsWrapper = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  centerContent: true
}))`
  margin-top: 10;
`

export const FilterIcon = styled(Icon).attrs(() => ({
  name: 'filter',
  color: colors.white,
}))``

export const SearchButton = styled(Icon).attrs(() => ({
  name: 'search',
  color: colors.white,
}))`
  margin-right: 10;
`
