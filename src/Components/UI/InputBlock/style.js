import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: column;
  margin-top: 5;
`

export const Label = styled.Text`
  color: ${colors.textGray};
  font-size: 15;
  margin-bottom: 2%;
`

export const Input = styled.TextInput`
  font-size: 20;
  padding-bottom: 0;
  padding-left: 0;
  padding-top: 0;
  flex: 1;
`

export const InputContainer = styled.View`
  flex-direction: row;
  border: 0 solid ${p => (p.isActive ? colors.blue : colors.disabledGray)};
  border-bottom-width: 1;
  height: ${p => p.height};
  padding-right: 5;
  margin-top: 10;
  ${p => p.isError && `border-color: ${colors.flory}`};
`

export const AnimateLabel = styled(Animated.Text)`
  position: absolute;
  left: 0;
  top: 10;
  font-size: 20;
  color: ${colors.disabledGray};
`

export const ErrorMessageBlock = styled.Text`
  margin-top: 5;
  font-size: 12;
  color: ${colors.flory};
`

export const FlagIconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: 5;
`

export const styles = {
  getIcon: isShowSecure => ({
    name: 'eye',
    color: isShowSecure ? colors.blue : colors.lightGray,
  }),
}
