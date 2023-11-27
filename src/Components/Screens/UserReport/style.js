import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.ScrollView`
  flex: 1;
  padding-top: 10;
`

export const Textarea = styled.TextInput.attrs(() => ({
  multiline: true,
  autoFocus: true,
}))`
  min-height: 250;
  font-size: 18;
  margin-left: 10;
  margin-right: 10;
  padding-left: 10;
  padding-right: 10;
  color: ${colors.textGray};
  border: solid 1px silver;
  border-radius: 10;
`
