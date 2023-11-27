import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Item = styled.ImageBackground`
  width: 100;
  height: 100;
  border-radius: 5;
  overflow: hidden;
  box-shadow: 0 0 5px ${colors.disabledGray};
  elevation: 7;
  background-color: #fff;
  position: relative;
  margin-right: 20;
  margin-top: 10;
  margin-bottom: 10;
  margin-left: 5;
  justify-content: center;
  align-items: center;
`

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 20;
  width: 20;
  background-color: ${colors.blue};
  border-radius: 20;
  top: 0;
  right: 0;
`

export const InfoText = styled.Text`
  margin-top: 5;
  font-size: 20;
  color: ${colors.textGray};
  max-width: 100;
`

export const styles = {
  Icon: {
    name: 'times',
    size: 12,
    color: colors.white,
  },
  ActivityIndicator: {
    size: 'medium',
    color: colors.blue,
  },
}
