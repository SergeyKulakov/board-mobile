import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space, flex } from 'styled-system'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 1%;
  padding-left: 1%;
  padding-bottom: 10;
  padding-top: 10;
`

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 2;
`

export const Middle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 5;
`

export const ClearButton = styled.Text`
  font-size: 16;
  color: ${colors.white};
  text-align: right;
`

export const BackIconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10;
`

export const Right = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 2;
`

export const styles = {
  Title: {
    textAlign: 'center',
  },
}
