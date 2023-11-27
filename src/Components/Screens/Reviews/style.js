import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`

export const Content = styled.FlatList`
  flex: 1;
  padding-right: 5;
  padding-left: 5;
`

export const ReviewCardWrapper = styled.View`
  margin-bottom: 10;
  margin-top: 10;
  box-shadow: 0 0 5px ${colors.disabledGray};
  elevation: 7;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`

export const ReviewProfileWrapper = styled.View`
  margin-top: 30;
  margin-bottom: 10;
`
