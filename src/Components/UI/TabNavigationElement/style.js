import styled from 'styled-components/native'
import { colors } from 'Themes'

export const ActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: 'small',
  color: colors.white,
}))``

export const Block = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  margin-right: 15;
  margin-left: 15;
`

export const Text = styled.Text`
  font-size: 16;
  color: ${colors.white};
  ${p => !p.active && 'opacity: 0.6'};
  font-weight: bold;
`

export const Line = styled.View`
  margin-top: 10;
  height: 3;
  width: 45;
  border-radius: 2;
  ${p => p.active && `background-color: ${colors.white}`};
`
