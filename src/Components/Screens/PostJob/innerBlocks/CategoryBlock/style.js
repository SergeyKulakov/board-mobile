import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const TextContainer = styled.View`
  flex-direction: column;
`

export const Title = styled.Text`
  font-size: 20;
  color: ${p => (p.error ? colors.red : colors.black)};
  font-weight: bold;
  margin-bottom: 10;
`

export const SubTitle = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
`

export const styles = {
  ArrowIcon: {
    type: 'mi',
    name: 'keyboard-arrow-right',
    size: 25,
    color: colors.disabledGray,
  },
}
