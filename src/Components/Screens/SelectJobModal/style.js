import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
`

export const JobCardWrapper = styled.View`
  min-height: 210;
  margin-bottom: 10;
  margin-top: 10;
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 7;
  background-color: #fff;
`
