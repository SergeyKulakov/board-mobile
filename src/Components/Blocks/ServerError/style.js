import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const IconBlock = styled.View`
  margin-bottom: 15;
`

export const Title = styled.Text`
  font-size: 30;
  color: ${colors.textGray};
`

export const ReloadText = styled.Text`
  font-size: 27;
  color: ${colors.textGray};
`

export const ReloadBlock = styled.View`
  flex-direction: column;
  margin-top: 30;
  align-items: center;
`

export const styles = {
  Icon: {
    name: 'exclamation-triangle',
    size: 50,
    color: colors.textGray,
  },
  ReloadIcon: {
    type: 'ant',
    name: 'sync',
    size: 30,
    color: colors.blue,
  },
}
