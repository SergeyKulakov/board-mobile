import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Left = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`

export const Middle = styled.View`
  flex-direction: row;
  justify-content: center;
  flex: 5;
`

export const Right = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const styles = {
  Title: {
    textAlign: 'center',
  },
}
