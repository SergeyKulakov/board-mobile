import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space, width } from 'styled-system'

export const Container = styled.View``

export const RowBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30;
`

export const RowItem = styled.View`
  width: 45%;
  margin-right: 5%;
  ${space};
  ${width};
`

export const LocationImageContainer = styled.View`
  padding-top: 20;
  width: 100%;
  min-height: 100;
  height: 200;
  overflow: hidden;
`

export const Header = styled.View`
  margin-bottom: 20;
  flex-direction: column;
`

export const SubTitle = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
  margin-top: 5;
`
