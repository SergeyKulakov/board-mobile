import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon as UIIcon } from '../../Icon'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CountText = styled.Text`
  font-size: 16;
  color: ${p => (p.disabled ? colors.disabledGray : colors.black)};
  font-weight: bold;
  margin-left: 5;
`

export const Icon = styled(UIIcon).attrs(props => ({
  name: 'star',
  size: 15,
  color: props.disabled ? colors.disabledGray : colors.amber,
}))``
