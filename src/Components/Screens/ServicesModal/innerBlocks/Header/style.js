import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-top: 5;
`

export const StepInfo = styled.Text`
  color: ${colors.white};
  opacity: 0.9;
  font-size: 17;
  align-self: flex-end;
`

export const Block = styled.View`
  flex: ${p => (p.isRoot ? 3 : 1)};
`

export const TitleContainer = styled.View`
  justify-content: center;
`

export const styles = {
  Title: {
    textAlign: 'center',
  },
}
