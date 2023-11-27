import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.FlatList`
  flex: 1;
`

export const CardWrapper = styled.View`
  margin-bottom: 20;
  box-shadow: 0 0 10px ${colors.disabledGray};
`
