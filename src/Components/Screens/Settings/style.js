import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
  padding-top: 20;
`
