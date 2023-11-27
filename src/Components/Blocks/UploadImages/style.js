import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { Icon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: column;
`

export const Title = styled.Text`
  font-weight: bold;
  color: ${colors.black};
  font-size: 18;
`

export const SubTitle = styled.Text`
  font-size: 14;
  color: ${colors.textGray};
  margin-top: 10;
`

export const ListContainer = styled.View`
  margin-top: 20;
`

export const PlusIcon = styled(Icon).attrs({
  name: 'plus',
  size: 35,
  color: colors.blue,
  type: 'ant',
})``

export const AddButton = styled.View`
  background-color: ${colors.zumthor};
  justify-content: center;
  align-items: center;
  width: 100;
  height: 100;
  border-radius: 5;
  margin-right: 20;
  margin-top: 10;
  margin-bottom: 10;
`

export const styles = {
  ActivityIndicator: {
    size: 'large',
    color: colors.blue,
  },
}
