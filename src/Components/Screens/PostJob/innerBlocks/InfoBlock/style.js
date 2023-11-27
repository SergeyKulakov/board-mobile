import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View``

export const Block = styled.View`
  width: 100%;
  padding-bottom: 20;
  padding-top: 10;
  ${space};
`

export const Header = styled.View`
  margin-bottom: 20;
`

export const BudgetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 10;
  padding-bottom: 20;
`

export const InputContainer = styled.View`
  flex: 1;
  padding-right: 10;
`
