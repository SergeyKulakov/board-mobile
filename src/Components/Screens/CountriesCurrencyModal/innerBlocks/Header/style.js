import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  padding-top: 5;
  flex-direction: row;
  align-items: center;
`

export const Left = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const Middle = styled.View`
  flex: 5;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Right = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const styles = {
  Title: {
    textAlign: 'center',
  },
  SearchIcon: {
    // type: '',
    name: 'search',
    size: 20,
    color: colors.white,
  },
}
